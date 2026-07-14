import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Bill() {

    const { billId } = useParams();

    const [bill, setBill] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        api.get(`/bills/${billId}`)
            .then((res) => {

                setBill(res.data);

                if (res.data.billType === "RESTAURANT") {

                    api.get(
                        `/food-order-items/food-order/${res.data.foodOrder.foodOrderId}`
                    )
                        .then((response) => {

                            setItems(response.data);

                        })
                        .catch((err) => {

                            console.log(err);

                        });

                }

            })
            .catch((err) => {

                console.log(err);

            });

    }, [billId]);

    if (!bill) {

        return (
            <div className="container mt-5 text-center">
                <h4>Loading Invoice...</h4>
            </div>
        );

    }

    return (

        <div className="container py-4">

            <Link
                to="/bills"
                className="btn btn-dark mb-3"
            >
                ← Back
            </Link>

            <div className="card shadow-lg border-0">

                {/* Header */}

                <div className="card-header bg-primary text-white text-center py-4">

                    <h2 className="fw-bold mb-1">

                        🏨 Horizon Hotel

                    </h2>

                    <h5 className="mb-0">

                        Restaurant / Room Invoice

                    </h5>

                </div>

                <div className="card-body">

                    {/* Invoice Information */}

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <p>

                                <b>Invoice No :</b><br />

                                {bill.billId}

                            </p>

                            <p>

                                <b>Bill Type :</b><br />

                                {bill.billType}

                            </p>

                        </div>

                        <div className="col-md-6 text-md-end">

                            <p>

                                <b>Status :</b><br />

                                <span
                                    className={`badge fs-6 ${
                                        bill.billStatus === "PAID"
                                            ? "bg-success"
                                            : "bg-danger"
                                    }`}
                                >
                                    {bill.billStatus}
                                </span>

                            </p>

                        </div>

                    </div>

                    <hr />

                    {/* Customer Information */}

                    <div className="card mb-4">

                        <div className="card-header bg-dark text-white">

                            👤 Customer Information

                        </div>

                        <div className="card-body">

                            <p>

                                <b>Name :</b>{" "}

                                {
                                    bill.billType === "RESTAURANT"

                                        ? `${bill.foodOrder.restaurantBooking.customer.firstName} ${bill.foodOrder.restaurantBooking.customer.lastName}`

                                        : `${bill.roomBooking.customer.firstName} ${bill.roomBooking.customer.lastName}`
                                }

                            </p>

                            <p>

                                <b>Mobile :</b>{" "}

                                {
                                    bill.billType === "RESTAURANT"

                                        ? bill.foodOrder.restaurantBooking.customer.mobile

                                        : bill.roomBooking.customer.mobile
                                }

                            </p>

                            <p>

                                <b>Email :</b>{" "}

                                {
                                    bill.billType === "RESTAURANT"

                                        ? bill.foodOrder.restaurantBooking.customer.email

                                        : bill.roomBooking.customer.email
                                }

                            </p>

                        </div>

                    </div>

                    {

                        bill.billType === "RESTAURANT"

                            ?

                            (

                                <div className="card mb-4">

                                    <div className="card-header bg-success text-white">

                                        🍽 Restaurant Booking

                                    </div>

                                    <div className="card-body">

                                        <p>

                                            <b>Table :</b>{" "}

                                            {
                                                bill.foodOrder.restaurantBooking.restaurantTable.tableNumber
                                            }

                                        </p>

                                        <p>

                                            <b>Guests :</b>{" "}

                                            {
                                                bill.foodOrder.restaurantBooking.guests
                                            }

                                        </p>

                                        <p>

                                            <b>Booking Date :</b>{" "}

                                            {
                                                bill.foodOrder.restaurantBooking.bookingDate
                                            }

                                        </p>

                                        <p>

                                            <b>Booking Time :</b>{" "}

                                            {
                                                bill.foodOrder.restaurantBooking.bookingTime
                                            }

                                        </p>

                                    </div>

                                </div>

                            )

                            :

                            (

                                <div className="card mb-4">

                                    <div className="card-header bg-info text-white">

                                        🛏 Room Booking

                                    </div>

                                    <div className="card-body">

                                        <p>

                                            <b>Room No :</b>{" "}

                                            {
                                                bill.roomBooking.room.roomNumber
                                            }

                                        </p>

                                        <p>

                                            <b>Check In :</b>{" "}

                                            {
                                                bill.roomBooking.checkInDate
                                            }

                                        </p>

                                        <p>

                                            <b>Check Out :</b>{" "}

                                            {
                                                bill.roomBooking.checkOutDate
                                            }

                                        </p>

                                    </div>

                                </div>

                            )

                    }

                    {/* ---------- Part 2 From Here ---------- */}



                                        {

                        bill.billType === "RESTAURANT" && (

                            <>

                                <hr />

                                <h5 className="mb-3">

                                    🍽 Ordered Items

                                </h5>

                                <table className="table table-striped table-hover table-bordered">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>Item</th>

                                            <th>Qty</th>

                                            <th>Price</th>

                                            <th>Total</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            items.length > 0

                                                ?

                                                items.map((item) => (

                                                    <tr key={item.foodOrderItemId}>

                                                        <td>

                                                            {item.menuItem.itemName}

                                                        </td>

                                                        <td>

                                                            {item.quantity}

                                                        </td>

                                                        <td>

                                                            ₹ {Number(item.price).toFixed(2)}

                                                        </td>

                                                        <td>

                                                            ₹ {Number(item.subtotal).toFixed(2)}

                                                        </td>

                                                    </tr>

                                                ))

                                                :

                                                (

                                                    <tr>

                                                        <td
                                                            colSpan="4"
                                                            className="text-center"
                                                        >

                                                            No Ordered Items

                                                        </td>

                                                    </tr>

                                                )

                                        }

                                    </tbody>

                                </table>

                            </>

                        )

                    }

                    <hr />

                    <h4 className="mb-3">

                        💰 Bill Summary

                    </h4>

                    <div className="row">

                        <div className="col-md-6">

                        </div>

                        <div className="col-md-6">

                            <table className="table">

                                <tbody>

                                    <tr>

                                        <th>

                                            Subtotal

                                        </th>

                                        <td className="text-end">

                                            ₹ {Number(bill.subtotal).toFixed(2)}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Tax

                                        </th>

                                        <td className="text-end">

                                            ₹ {Number(bill.tax).toFixed(2)}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Discount

                                        </th>

                                        <td className="text-end">

                                            ₹ {Number(bill.discount).toFixed(2)}

                                        </td>

                                    </tr>

                                    <tr className="table-success">

                                        <th>

                                            Grand Total

                                        </th>

                                        <th className="text-end text-success">

                                            ₹ {Number(bill.grandTotal).toFixed(2)}

                                        </th>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div className="text-center mt-4">

                      {
    bill.billStatus === "UNPAID"

        ?

        (

            <button
                className="btn btn-success btn-lg w-100 mt-3"
                onClick={() => navigate(`/payment/${bill.billId}`)}
            >
                💳 Pay Now
            </button>

        )

        :

        (

            <span className="btn btn-success btn-lg w-100 mt-3">

                ✔ PAYMENT SUCCESS

            </span>

        )
}

                    </div>

                </div>

            </div>

        </div>

    );

}