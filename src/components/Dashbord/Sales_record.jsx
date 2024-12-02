import React, { useState, useEffect } from "react";
import Axios from "axios";

function Sales_record() {
    const [sales, setSales] = useState({ totalSales: 0, numberOfTransactions: 0, payment: 0 });

    const fetchSalesData = () => {
        Axios.get('http://localhost:3002/add-guest')
            .then((response) => {
                const results = response.data.results;
                const totalSales = results.reduce((acc, guest) => acc + parseFloat(guest.payment), 0);
                const numberOfTransactions = results.length;
                const payment = results.length > 0 ? parseFloat(results[0].payment) : 0;
                setSales({ totalSales, numberOfTransactions, payment });
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
            });
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    const recordSales = () => {
        Axios.post('http://localhost:3002/add-guest', { payment: sales.payment })
            .then((response) => {
                console.log(response);
                fetchSalesData();
            })
            .catch((error) => {
                console.error("Error recording sales:", error);
            });
    };

    const calculateTotalSales = () => {
        return sales.totalSales.toLocaleString();
    };

    const calculateTotalMonthlySales = () => {
        const monthlyRevenue = sales.numberOfTransactions * sales.payment;
        return monthlyRevenue.toLocaleString();
    };

    const calculateNetWorth = () => {
        const netWorth = sales.totalSales - (sales.numberOfTransactions * sales.payment);
        return netWorth.toLocaleString();
    };

    return (
        <div className=" container "  >
            <div className="row ">
                <div className="col-md-4" >
                    <div className="card text-white bg-primary mb-3" style={{ marginTop: '8em', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)' }}>
                        <div className="card-header bg-transparent text-white">Sales Transaction For Today</div>
                        <div className="card-body" style={{ height: '11em' }}>
                            <p className="card-text fs-2">Sales: ₱ {calculateTotalSales()}</p>
                            <p className="card-text fs-5">Number of Transactions: {sales.numberOfTransactions}</p>
                            <p className="card-text">Total Sales: ₱ {calculateTotalMonthlySales()}</p>
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                            <button  className="btn btn-dark float-right">Show more</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" >
                    <div className="card text-dark bg-warning mb-3" style={{ marginTop: '8em' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)'  }}>
                        <div className="card-header text-white">Total Monthly Transactions</div>
                        <div className="card-body text-white" style={{ height: '11em' }}>
                            <p className="card-text  fs-2">Transactions: {sales.numberOfTransactions.toLocaleString()}</p>
                            <p className="card-text fs-5">Monthly Revenue: ₱ {calculateTotalSales()}</p>
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                            <a href="/net-worth" className="btn btn-dark btn-block">Show more</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" >
                    <div className="card text-dark bg-success mb-3" style={{ marginTop: '8em' , boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)' }}>
                        <div className="card-header bg-transparent text-white">Net worth of monthly transactions</div>
                        <div className="card-body text-white" style={{ height: '11em' }}>
                            <p className=" fs-2">Net Worth: ₱ {calculateNetWorth()}</p>
                            <p className="card-text fs-5">Total Expenses: ₱ {calculateTotalMonthlySales()}</p>
                        </div>
                        <div className="card-footer bg-transparent border-top-0">
                            <a href="/net-worth" className="btn btn-dark btn-block">Show more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Sales_record;
