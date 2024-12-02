import React from "react";

const Topbar = ({ isLoggedIn }) => {
    const userEmail = localStorage.getItem('userEmail');

    return (
        <div className=" topbar bottom-navbar fixed-top" style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            width: "100%", 
            height: '70px', 
            backgroundColor: "#fff", 
            padding: "10px 10px", 
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            flexDirection: "row"
        }}>
            <div className="logos" style={{ marginBottom: "10px" }}>
                <img src="../img/logo.png" alt="" style={{ width: "200px" }} />
            </div>
            <ul style={{ 
                display: "flex", 
                listStyle: "none", 
                margin: 0, 
                padding: 0,
                marginLeft: "20px"
            }} className="ms-auto">
                <li>
                    <a className="admin text-primary" href={"mailto:" + userEmail} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        color: "#000"
                    }}>
                        <img src="../img/profile.png" alt="" style={{ width: "40px", marginRight: "5px" }} />
                        {userEmail}
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Topbar;
