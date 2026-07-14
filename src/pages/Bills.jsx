import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Bills() {

    const [bills, setBills] = useState([]);

    const getBills = () => {

        api.get("/bills")

            .then((res) => {

                setBills(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    };

    useEffect(() => {

        getBills();

    }, []);

    return (

        <div className="container py-4">

            <h2 className="mb-4">

                🧾 Bills

            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>#</th>

                                <th>Bill Type</th>

                                <th>Amount</th>

                                <th>Status</th>

                                <th>Created</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                bills.map((bill, index) => (

                                    <tr key={bill.billId}>

                                        <td>{index + 1}</td>

                                        <td>{bill.billType}</td>

                                        <td>₹ {bill.grandTotal}</td>

                                        <td>

                                            {

                                                bill.billStatus === "PAID"

                                                    ?

                                                    <span className="badge bg-success">

                                                        PAID

                                                    </span>

                                                    :

                                                    <span className="badge bg-danger">

                                                        UNPAID

                                                    </span>

                                            }

                                        </td>

                                        <td>

                                            {

                                                bill.createdAt?.substring(0, 10)

                                            }

                                        </td>

                                        <td>

                                            <Link

                                                to={`/bill/${bill.billId}`}

                                                className="btn btn-primary btn-sm"

                                            >

                                                View

                                            </Link>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}