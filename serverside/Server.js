const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');



const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'hansardon',
});
// -dbcon---------------------------------
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});
// ---------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../img/') // upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

app.post('/add-room', upload.single('image'), (req, res) => {
    const { description, roomName, price } = req.body;
    const image = req.file.filename;

    const SQL = 'INSERT INTO rooms (image, description, room_name, price) VALUES (?, ?, ?, ?)';
    const values = [image, description, roomName, price];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.log('Failed to add room:', err);
            res.status(500).json({ error: 'Failed to add room' });
        } else {
            console.log('Room added successfully');
            res.status(200).json({ message: 'Room added successfully' });
            
        }
    });
});

// ---------------------------------------------------
app.get('/add-rooms', (req, res) => {
    const SQL = 'SELECT * FROM rooms';
    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Error fetching rooms:', err);
            res.status(500).json({ error: 'Failed to fetch rooms' });
        } else {
            res.status(200).json(results);
        }
    });
});
// ------------------------------------------------------
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'DELETE FROM rooms WHERE id = ?';
    db.query(SQL, id, (err, results) => {
        if (err) {
            console.log('Deletion Fail', err);
            return res.status(500).json({ message: 'Deletion failed', error: err });
        }
        if (results.affectedRows === 0) {
            console.log('No room found with id:', id);
            return res.status(404).json({ message: 'Room not found for deletion' });
        }
        console.log('Deletion Success', results);
        res.status(200).json({ message: 'Deletion successful', results: results });
    });
});
// --------------------------------

app.put('/update/:id', upload.single('image'), (req, res) => {
    const id = req.params.id; // Get id from URL parameter


    let image = req.body.image;
    if (req.file) {
        image = req.file.filename;
    }

    const SQL = `
    UPDATE rooms
    SET
        image = COALESCE(?, image), 
        description = COALESCE(?, ''),
        room_name = COALESCE(?, ''),
        price = COALESCE(?, 0)
    WHERE
        id = ?;
`;
    const values = [
        image,
        req.body.description || '',
        req.body.room_name || '',
        parseFloat(req.body.price) || 0,
        id
    ];

    console.log('SQL query:', SQL);
    console.log('Update values:', values);

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error updating room:', err);
            res.status(500).json({ error: 'Failed to update room' });
        } else {
            console.log('Room updated successfully');
           
            db.query('SELECT * FROM rooms WHERE id = ?', id, (err, updatedRoom) => {
                if (err) {
                    console.error('Error fetching updated room data:', err);
                    res.status(500).json({ error: 'Failed to fetch updated room data' });
                } else {
                    res.status(200).json(updatedRoom[0]);
                }
            });
        }
    });
});
// --------------------------------------------------------------------------------------
app.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'SELECT * FROM rooms WHERE id = ?';
    db.query(SQL, id, (err, results) => {
        if (err) {
            console.error('Error fetching room:', err);
            res.status(500).json({ message: "Internal server error" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: "Room not found" });
            } else {
                res.json(results[0]);
            }
        }
    });
});
// -----------------------------------------------------------------------------------------
app.put('/update-availability/:id', (req, res) => {
    const id = req.params.id;
    const available = req.body.available;

    const SQL = 'UPDATE rooms SET available = ? WHERE id = ?';

    db.query(SQL, [available, id], (err, results) => {
        if (err) {
            console.error('Error updating room availability:', err);
            res.status(500).json({ error: 'Failed to update room availability' });
        } else {
            console.log('Room availability updated successfully');
            res.status(200).json({ message: 'Room availability updated successfully' });
        }
    });
});
// ---------------------------------------------------------------------------------
app.get('/update-availability/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'SELECT available FROM rooms WHERE id = ?';
    db.query(SQL, id, (err, results) => {
        if (err) {
            res.json({ err: 'Failed' });
        } else {
            res.json({ available: results[0].available });
        }
    });
});


// ---------------------------------------------------------------------------------------
app.post('/add-guest', (req, res) => {
    const setName = req.body.name;
    const setCheckin = req.body.checkin;
    const setCheckout = req.body.checkout;
    const setRoomName = req.body.room_name;
    const setPayment = req.body.payment;
    const setMethod = req.body.method;

    const guestValues = [setName, setCheckin, setCheckout, setRoomName, setPayment, setMethod];
    const saleValues = [setPayment]; // Assuming setPayment is the price for the sale

    const guestSQL = 'INSERT INTO guest(name, checkin, checkout, room_name, payment, method) VALUES(?,?,?,?,?,?)';
    const saleSQL = 'INSERT INTO sales (payment) VALUES (?)';

    db.query(guestSQL, guestValues, (err, guestResult) => {
        if (err) {
            res.json({ err: 'Failed to Add Guest' });
        } else {
            db.query(saleSQL, saleValues, (saleErr, saleResult) => {
                if (saleErr) {
                    res.json({ err: 'Failed to Add Sale' });
                } else {
                    res.json({ guestResult, saleResult });
                }
            });
        }
    });
});
app.get('/add-guest', (req, res) => {
    const SQL = 'SELECT * FROM guest';
    db.query(SQL, (err, results) => {
        if (err) {
            res.json({ error: "Fail" })
        } else {
            res.json({ results })
        }
    })
})

// --------------------------------
app.delete('/delete-guest/:id', (req, res) => {
    const id = req.params.id;
    const SQL = 'DELETE FROM guest WHERE id = ?';
    db.query(SQL, id, (err, results) => {
        if (err) {
            console.log('Deletion Fail', err);
            return res.status(500).json({ message: 'Deletion failed', error: err });
        }
        if (results.affectedRows === 0) {
            console.log('No guest found with id:', id);
            return res.status(404).json({ message: 'Guest not found for deletion' });
        }
        console.log('Deletion Success', results);
        res.status(200).json({ message: 'Deletion successful', results: results });
    });
});
// -----------------------------------------------------------
app.get("/email", (req, res) => {
    const userId = req.user.id; 
    const SQL = 'SELECT email FROM users WHERE id = ?'; 
    db.query(SQL, userId, (err, results) => {
        if (err) {
            console.error('Error fetching email:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                res.json({ email: results[0].email });
            } else {
                res.status(404).json({ error: 'Email not found' });
            }
        }
    });
});
app.put('/editguest/:id', upload.none(), (req, res) => {
    const id = req.params.id; 
    const { name, checkin, checkout, room_name, payment, method } = req.body;

    const SQL = `
    UPDATE guest
    SET
        name = COALESCE(?, name),
        checkin = COALESCE(?, checkin),
        checkout = COALESCE(?, checkout),
        room_name = COALESCE(?, room_name),
        payment = COALESCE(?, payment),
        method = COALESCE(?, method)
    WHERE
        id = ?;
`;
const values = [
    name,
    req.body.checkin || '',
    req.body.checkout || '',
    req.body.room_name || '',
    parseFloat(req.body.payment) || 0,
    req.body.method || '',
    id
];


    console.log('SQL query:', SQL);
    console.log('Update values:', values);

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error updating guest:', err);
            return res.status(500).json({ error: 'Failed to update guest' });
        } else {
            console.log('Guest updated successfully');
            // Fetch the updated guest data and send it in the response
            db.query('SELECT * FROM guest WHERE id = ?', id, (err, updatedGuest) => {
                if (err) {
                    console.error('Error fetching updated guest data:', err);
                    return res.status(500).json({ error: 'Failed to fetch updated guest data' });
                } else {
                    if (updatedGuest.length === 0) {
                        return res.status(404).json({ error: 'Guest not found' });
                    } else {
                        return res.status(200).json(updatedGuest[0]);
                    }
                }
            });
        }
    });
});

// --------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
