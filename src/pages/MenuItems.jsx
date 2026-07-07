import { useEffect, useState } from "react";
import api from "../services/api";
import { Button, Modal, Form } from "react-bootstrap";


export default function MenuItems() {
const [menuItems, setMenuItems] = useState([]);

const [show, setShow] = useState(false);

const [isEdit, setIsEdit] = useState(false);

const [search, setSearch] = useState("");
const [image, setImage] = useState(null);
const [formData, setFormData] = useState({
      
    itemName: "",

    category: "",

    price: "",

    description: "",

    available: true,

     imageUrl: ""

});





const handleClose = () => {

    setShow(false);

    setIsEdit(false);

    setFormData({

        itemName: "",

        category: "",

        price: "",

        description: "",

        available: true,

         imageUrl: ""

    });
    setImage(null);

};

const handleShow = () => {

    setShow(true);

};

const getMenuItems = () => {

    api.get("/menu-items")

        .then((res) => {

            setMenuItems(res.data);

        })

        .catch((err) => {

            console.log(err);

        });

};

useEffect(() => {

    getMenuItems();

}, []);

const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

        ...formData,

        [name]: type === "checkbox" ? checked : value

    });

};

const saveMenuItem =async () => {

    if (!formData.itemName) {

        alert("Enter Item Name");

        return;

    }

    if (!formData.category) {

        alert("Enter Category");

        return;

    }

    if (!formData.price) {

        alert("Enter Price");

        return;

    }

    let imageUrl = formData.imageUrl;

if (image) {

    const data = new FormData();

    data.append("file", image);

    const uploadResponse = await api.post(
        "/upload/menu",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    imageUrl = "/uploads/menu/" + uploadResponse.data;
}

    if (isEdit) {
api.put(
    `/menu-items/${formData.menuItemId}`,
    {
        ...formData,
        imageUrl: imageUrl
    }
)

        .then(() => {

            getMenuItems();

            handleClose();

        })

        .catch(console.log);

    }

    else {

       api.post(
    "/menu-items",
    {
        ...formData,
        imageUrl: imageUrl
    }
)

        .then(() => {

            getMenuItems();

            handleClose();

        })

        .catch(console.log);

    }

};

const editMenuItem = (item) => {

    setFormData(item);

    setIsEdit(true);

    setShow(true);

};

const deleteMenuItem = (id) => {

    if (!window.confirm("Delete this Menu Item?"))

        return;

    api.delete(`/menu-items/${id}`)

        .then(() => {

            getMenuItems();

        })

        .catch(console.log);

};



const filteredItems = menuItems.filter((item) =>

    item.itemName
        .toLowerCase()
        .includes(search.toLowerCase())

);


return (

<div className="container-fluid py-4 px-4">

    {/* ===========================
            HEADER
    ============================ */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <div className="d-flex align-items-center">

                <div
                    className="bg-primary bg-opacity-10 rounded-3 p-3 me-3"
                >

                    <i
                        className="bi bi-fork-knife text-primary"
                        style={{ fontSize: "35px" }}
                    ></i>

                </div>

                <div>

                    <h2 className="fw-bold mb-0">

                        Menu Items

                    </h2>

                    <small className="text-muted">

                        Manage your restaurant menu items

                    </small>

                </div>

            </div>

        </div>

        <Button
            variant="primary"
            size="lg"
            onClick={handleShow}
        >

            <i className="bi bi-plus-lg me-2"></i>

            Add Menu Item

        </Button>

    </div>

    {/* ===========================
            SEARCH + FILTER
    ============================ */}

    <div className="row mb-4">

        <div className="col-lg-9">

            <div className="input-group">

                <span className="input-group-text bg-white">

                    <i className="bi bi-search"></i>

                </span>

                <input

                    type="text"

                    className="form-control"

                    placeholder="Search Menu Item..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

        </div>

        <div className="col-lg-3">

            <select className="form-select">

                <option>

                    All Categories

                </option>

                <option>

                    Main Course

                </option>

                <option>

                    South Indian

                </option>

                <option>

                    Chinese

                </option>

                <option>

                    Dessert

                </option>

                <option>

                    Beverages

                </option>

            </select>

        </div>

    </div>

    {/* ===========================
          CATEGORY BUTTONS
    ============================ */}

    <div className="mb-4">

        <Button
            className="rounded-pill me-2"
        >
            All
        </Button>

        <Button
            variant="outline-secondary"
            className="rounded-pill me-2"
        >
            Main Course
        </Button>

        <Button
            variant="outline-secondary"
            className="rounded-pill me-2"
        >
            South Indian
        </Button>

        <Button
            variant="outline-secondary"
            className="rounded-pill me-2"
        >
            Chinese
        </Button>

        <Button
            variant="outline-secondary"
            className="rounded-pill me-2"
        >
            Dessert
        </Button>

        <Button
            variant="outline-secondary"
            className="rounded-pill"
        >
            Beverages
        </Button>

    </div>

{/* ===========================
        MENU CARDS
=========================== */}

<div className="row">

    {filteredItems.map((item) => (

        <div
            className="col-xl-3 col-lg-4 col-md-6 mb-4"
            key={item.menuItemId}
        >

            <div
                className="card border-0 shadow-sm h-100"
                style={{
                    borderRadius: "18px",
                    overflow: "hidden"
                }}
            >

                {/* ======================
                      FOOD IMAGE
                ====================== */}

                <div className="position-relative">

                    <img
    src={
        item.imageUrl
            ? `http://localhost:8080${item.imageUrl}`
            : "/images/menu/default-food.jpg"
    }
    className="card-img-top"
    style={{
        height: "230px",
        objectFit: "cover"
    }}
    alt={item.itemName}
/>
                    {/* Available Badge */}

                    <span
                        className={
                            item.available

                                ? "badge bg-success position-absolute top-0 end-0 m-3"

                                : "badge bg-danger position-absolute top-0 end-0 m-3"
                        }
                    >

                        {

                            item.available

                                ? "Available"

                                : "Unavailable"

                        }

                    </span>

                    {/* Favourite */}

                    <button
                        className="btn btn-light rounded-circle position-absolute bottom-0 end-0 m-3 shadow"
                    >

                        <i className="bi bi-heart"></i>

                    </button>

                </div>

                {/* ======================
                    BODY
                ====================== */}

                <div className="card-body">

                    <h4 className="fw-bold">

                        {item.itemName}

                    </h4>

                    <span
                        className="badge rounded-pill bg-info text-dark"
                    >

                        {item.category}

                    </span>

                    <h2
                        className="text-success mt-3"
                    >

                        ₹ {item.price}

                    </h2>

                    <p
                        className="text-muted"
                    >

                        {item.description}

                    </p>

                    {/* ======================
                        AVAILABLE PANEL
                    ====================== */}

                    <div
                        className="border rounded-3 bg-success bg-opacity-10 text-center py-2 mt-4"
                    >

                        {

                            item.available ?

                            <span className="text-success fw-bold">

                                <i className="bi bi-circle-fill me-2"></i>

                                Available

                            </span>

                            :

                            <span className="text-danger fw-bold">

                                <i className="bi bi-circle-fill me-2"></i>

                                Unavailable

                            </span>

                        }

                    </div>

                    {/* ======================
                        ACTION BUTTONS
                    ====================== */}

                    <div className="row mt-3">

                        <div className="col-6">

                            <Button
                                variant="warning"
                                className="w-100"
                                onClick={() => editMenuItem(item)}
                            >

                                <i className="bi bi-pencil-square me-2"></i>

                                Edit

                            </Button>

                        </div>

                        <div className="col-6">

                            <Button
                                variant="danger"
                                className="w-100"
                                onClick={() =>
                                    deleteMenuItem(item.menuItemId)
                                }
                            >

                                <i className="bi bi-trash me-2"></i>

                                Delete

                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    ))}







{/* =====================================
            ADD / UPDATE MODAL
====================================== */}

<Modal
    show={show}
    onHide={handleClose}
    centered
    size="lg"
>

    <Modal.Header
        closeButton
        className="bg-primary text-white"
    >

        <Modal.Title>

            <i
                className={`bi ${
                    isEdit
                        ? "bi-pencil-square"
                        : "bi-plus-circle-fill"
                } me-2`}
            ></i>

            {

                isEdit

                    ? "Update Menu Item"

                    : "Add Menu Item"

            }

        </Modal.Title>

    </Modal.Header>

    <Modal.Body>

        <Form>

            <div className="row">

                {/* Item Name */}

                <div className="col-md-6 mb-3">

                    <Form.Label>

                        Item Name

                    </Form.Label>

                    <Form.Control

                        type="text"

                        name="itemName"

                        value={formData.itemName}

                        onChange={handleChange}

                        placeholder="Veg Biryani"

                    />

                </div>

                {/* Category */}

                <div className="col-md-6 mb-3">

                    <Form.Label>

                        Category

                    </Form.Label>

                    <Form.Select

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                    >

                        <option value="">
                            Select Category
                        </option>

                        <option>Main Course</option>

                        <option>South Indian</option>

                        <option>Chinese</option>

                        <option>Dessert</option>

                        <option>Beverages</option>

                        <option>Starters</option>

                    </Form.Select>

                </div>

                {/* Price */}

                <div className="col-md-6 mb-3">

                    <Form.Label>

                        Price

                    </Form.Label>

                    <Form.Control

                        type="number"

                        name="price"

                        value={formData.price}

                        onChange={handleChange}

                        placeholder="250"

                    />

                </div>

                {/* Available */}

                <div className="col-md-6 mb-3">

                    <Form.Label>

                        Status

                    </Form.Label>

                    <Form.Select

                        name="available"

                        value={formData.available}

                        onChange={(e) =>

                            setFormData({

                                ...formData,

                                available:

                                    e.target.value === "true"

                            })

                        }

                    >

                        <option value={true}>
                            Available
                        </option>

                        <option value={false}>
                            Unavailable
                        </option>

                    </Form.Select>

                </div>

                {/* Description */}

                <div className="col-md-12">

                    <Form.Label>

                        Description

                    </Form.Label>

                    <Form.Control

                        as="textarea"

                        rows={4}

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Enter menu item description..."

                    />

                </div>

                {/* Food Image */}

<div className="col-md-12 mt-3">

    <Form.Label>

        Food Image

    </Form.Label>

    <Form.Control

        type="file"

        accept="image/*"

        onChange={(e) =>

            setImage(e.target.files[0])

        }

    />

</div>

            </div>

        </Form>

    </Modal.Body>

    <Modal.Footer>

        <Button
            variant="secondary"
            onClick={handleClose}
        >

            Close

        </Button>

        <Button
            variant={
                isEdit
                    ? "warning"
                    : "primary"
            }
            onClick={saveMenuItem}
        >

            <i
                className={`bi ${
                    isEdit
                        ? "bi-check-circle-fill"
                        : "bi-save-fill"
                } me-2`}
            ></i>

            {

                isEdit

                    ? "Update Item"

                    : "Save Item"

            }

        </Button>

    </Modal.Footer>

</Modal>

</div>

</div>

    );

}