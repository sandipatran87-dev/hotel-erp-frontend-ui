import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import table2 from "../assets/tables/table2.jpg";
import table4 from "../assets/tables/table4.jpg";
import table6 from "../assets/tables/table6.jpg";
import table8 from "../assets/tables/table8.jpg";
import table10 from "../assets/tables/table10.jpg";

export default function RestaurantTableDetails() {

    const navigate = useNavigate();

    const { tableId } = useParams();

    const [table, setTable] = useState(null);

    const tableImages = {
        2: table2,
        4: table4,
        6: table6,
        8: table8,
        10: table10
    };

    const getTable = () => {

    api.get(`/restaurant-tables/${tableId}`)

        .then((res) => {

            setTable(res.data);

        })

        .catch((err) => {

            console.log(err);

        });

};

const openFoodOrder = () => {

    api.get(`/food-orders/table/${table.tableId}`)

        .then((res) => {

            navigate(`/food-order/${res.data.foodOrderId}`);

        })

        .catch((err) => {

            console.log(err);

            alert("Food Order Not Found");

        });

};

useEffect(() => {

    getTable();

}, [tableId]);

if (!table) {

    return (

        <div className="container p-5">

            <h3>Loading...</h3>

        </div>

    );

}


return (

<div className="container-fluid p-4">

<button

className="btn btn-dark mb-4"

onClick={() => navigate(-1)}

>

← Back

</button>

<div className="card shadow border-0">

<div className="row">

<div className="col-lg-6">

<img

src={tableImages[table.capacity]}

alt=""

className="img-fluid w-100"

style={{

height:"500px",

objectFit:"cover"

}}

 />

</div>


<div className="col-lg-6 p-5">

    <h1 className="fw-bold">

        Table {table.tableNumber}

    </h1>

    <h4 className="text-primary">

        Restaurant Table

    </h4>

    <hr />

    <h5 className="mb-3">

        👥 Capacity :

        <span className="text-primary">

            {" "}

            {table.capacity} Seats

        </span>

    </h5>

    <h5 className="mb-3">

        Status :

        <span
            className={
                table.tableStatus === "AVAILABLE"
                    ? "badge bg-success ms-2"

                    : table.tableStatus === "RESERVED"
                    ? "badge bg-warning text-dark ms-2"

                    : "badge bg-danger ms-2"
            }
        >

            {table.tableStatus}

        </span>

    </h5>

    <hr />

   <div className="d-flex gap-2 mt-3">

    {
        table.tableStatus === "AVAILABLE"

        ?

        <button
            className="btn btn-primary fw-bold w-50 rounded-pill"
            onClick={() =>
                navigate(`/book-table/${table.tableId}`)
            }
        >
            🍽 Book Table
        </button>

        :

        <button
            className="btn btn-outline-secondary fw-bold w-50 rounded-pill"
            disabled
        >
            🚫 Not Available
        </button>

    }

    <button
        className="btn btn-warning text-dark fw-bold w-50 rounded-pill"
        onClick={openFoodOrder}
    >
        🛒 Food Order
    </button>

</div>



</div>




</div>

</div>

<hr className="my-5" />

<div className="card shadow border-0">

    <div className="card-body">

        <h3 className="mb-4">

            🍕 Popular Menu

        </h3>

        <div className="row">

            <div className="col-md-3">

                <div className="card text-center">

                    <div className="card-body">

                        <h5>🍕 Pizza</h5>

                        <h6 className="text-success">

                            ₹220

                        </h6>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center">

                    <div className="card-body">

                        <h5>🍔 Burger</h5>

                        <h6 className="text-success">

                            ₹180

                        </h6>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center">

                    <div className="card-body">

                        <h5>🥤 Cold Drink</h5>

                        <h6 className="text-success">

                            ₹60

                        </h6>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card text-center">

                    <div className="card-body">

                        <h5>🍨 Ice Cream</h5>

                        <h6 className="text-success">

                            ₹120

                        </h6>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

</div>
);

      
}