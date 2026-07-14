import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FoodOrder() {

    const navigate = useNavigate();

    const { foodOrderId } = useParams();

   const [menuItems, setMenuItems] = useState([]);
const [cartItems, setCartItems] = useState([]);

const [search, setSearch] = useState("");

const [loadingBill, setLoadingBill] = useState(false);



    // ==========================
    // Load Menu
    // ==========================

   const getMenuItems = () => {

    api.get("/menu-items")

        .then((res) => {

            setMenuItems(res.data);

        })

        .catch((err) => {

            console.log(err);

        });

};

 


const getCartItems = () => {

    api.get(`/food-order-items/food-order/${foodOrderId}`)

        .then((res) => {

            setCartItems(res.data);

        })

        .catch((err) => {

            console.log(err);

        });

};


const updateQuantity = (foodOrderItemId, quantity) => {

    if (quantity <= 0) return;

    api.put(
        `/food-order-items/${foodOrderItemId}?quantity=${quantity}`
    )

    .then(() => {

        getCartItems();

    })

    .catch((err) => {

        console.log(err);

    });

};


const deleteItem = (foodOrderItemId) => {

    api.delete(`/food-order-items/${foodOrderItemId}`)

        .then(() => {

            getCartItems();

        })

        .catch((err) => {

            console.log(err);

        });

};

const generateBill = () => {

    if (cartItems.length === 0) {

        alert("Please add food items first.");

        return;

    }

    if (!window.confirm("Generate Bill?")) {

        return;

    }

    setLoadingBill(true);

    api.post(`/bills/food/${foodOrderId}`)

        .then((res) => {

            navigate(`/bill/${res.data.billId}`);

        })

        .catch((err) => {

            console.log(err);

            if (err.response?.status === 409) {

                alert("Bill already generated.");

            } else {

                alert("Bill generation failed.");

            }

        })

        .finally(() => {

            setLoadingBill(false);

        });

};

    // ==========================
// Add To Cart
// ==========================
const addToCart = (menuItem) => {

    const body = {

        foodOrder: {

            foodOrderId

        },

        menuItem: {

            menuItemId: menuItem.menuItemId

        },

        quantity: 1

    };

    api.post("/food-order-items", body)

        .then(() => {

            getCartItems();

        })

        .catch((err) => {

            console.log(err);

            alert("Failed To Add Item");

        });

};

   useEffect(() => {

    getMenuItems();

    getCartItems();

}, []);


  return (

    <div className="container-fluid py-4">

        <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
        >
            ← Back
        </button>

        <div className="card shadow border-0">

            <div className="card-header bg-success text-white">

                <div className="d-flex justify-content-between align-items-center">

                    <h3 className="mb-0">
                        🍽 Food Order
                    </h3>

                    <h5 className="mb-0">
                        Order ID :
                        <span className="text-warning">
                            {" "}{foodOrderId}
                        </span>
                    </h5>

                </div>

            </div>

            <div className="card-body">

                <div className="row">

                    {/* ========================= */}
                    {/* LEFT SIDE - MENU */}
                    {/* ========================= */}

                    <div className="col-lg-8">

                        <div className="mb-4">

                            <input
    type="text"
    className="form-control form-control-lg"
    placeholder="🔍 Search Food..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>


   </div>

  <div className="row">

{
    menuItems
        .filter((item) =>
            item.itemName
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .map((item) => (

            <div
                key={item.menuItemId}
                className="col-md-6 col-lg-6 mb-4"
            >

                <div className="card h-100 shadow border-0 rounded-4">

                    <img
                        src={`http://localhost:8080${item.imageUrl}`}
                        className="card-img-top"
                        style={{
                            height: "220px",
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px"
                        }}
                        alt={item.itemName}
                    />

                    <div className="card-body d-flex flex-column">

                        <h5 className="fw-bold">

                            {item.itemName}

                        </h5>

                        <span className="badge bg-secondary mb-2">

                            {item.category}

                        </span>

                        <h4 className="text-success fw-bold">

                            ₹ {Number(item.price).toFixed(2)}

                        </h4>

                        <button
                            className="btn btn-success w-100 mt-auto"
                            onClick={() => addToCart(item)}
                        >

                            🛒 Add To Cart

                        </button>

                    </div>

                </div>

            </div>

        ))

}

</div>

</div>

{
    menuItems
        .filter((item) =>
            item.itemName
                .toLowerCase()
                .includes(search.toLowerCase())
        ).length === 0 && (

        <div className="text-center py-5">

            <h4>No Food Found</h4>

        </div>

    )
}


                    {/* ========================= */}
                    {/* RIGHT SIDE - CART */}
                    {/* ========================= */}

                    <div className="col-lg-4">

                        <div className="card shadow sticky-top">

                            <div className="card-header bg-primary text-white">
<h4 className="mb-0">

    🛒 Order Summary

</h4>

                            </div>

                            <div className="card-body">

    {
        cartItems.length === 0 ?

        (

          <div className="text-center text-muted py-5">

    <h1>🛒</h1>

    <h5>No Items Added Yet</h5>

    <p>

        Please select food from the menu.

    </p>

</div>

        )

        :

        (

            cartItems.map((item) => (

                <div
                    key={item.foodOrderItemId}
                    className="border rounded p-3 mb-3 shadow-sm"
                >

                    <h5 className="fw-bold">

                        {item.menuItem.itemName}

                    </h5>

                    <div className="d-flex justify-content-between">

                       <div className="d-flex align-items-center gap-2 mt-2">

    <button
       className="btn btn-outline-danger btn-sm"
       onClick={() => {

    if (item.quantity === 1) {

        deleteItem(item.foodOrderItemId);

    } else {

        updateQuantity(
            item.foodOrderItemId,
            item.quantity - 1
        );

    }

}}
    >
        -
    </button>

    <strong>

        {item.quantity}

    </strong>

    <button
      className="btn btn-outline-success btn-sm"
        onClick={() =>
            updateQuantity(
                item.foodOrderItemId,
                item.quantity + 1
            )
        }
    >
        +
    </button>


<button
    className="btn btn-outline-danger btn-sm ms-2"
    onClick={() => deleteItem(item.foodOrderItemId)}
>
    🗑 Remove
</button>


</div>

                        <span className="text-success">

                           ₹ {Number(item.subtotal).toFixed(2)}

                        </span>

                    </div>

                </div>

            ))

        )

    }

</div>


                            <div className="card-footer">

                              <div className="d-flex justify-content-between">

    <strong>

        Grand Total

    </strong>

   <h4 className="text-success fw-bold mb-0">

    ₹ {

        cartItems

            .reduce(

                (total, item) => total + Number(item.subtotal),

                0

            )

            .toFixed(2)

    }

</h4>

</div>
{
    cartItems.length > 0 && (

        <button

            className="btn btn-success btn-lg w-100 mt-3"

            onClick={generateBill}

            disabled={loadingBill}

        >

            {

                loadingBill

                    ? "Generating Bill..."

                    : "🧾 Generate Bill"

            }

        </button>

    )
}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);
}