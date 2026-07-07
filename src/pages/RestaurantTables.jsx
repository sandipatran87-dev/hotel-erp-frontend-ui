
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./RestaurantTable.css";
import table2 from "../assets/tables/table2.jpg";
import table4 from "../assets/tables/table4.jpg";
import table6 from "../assets/tables/table6.jpg";
import table8 from "../assets/tables/table8.jpg";
import table10 from "../assets/tables/table10.jpg";

export default function RestaurantTable() {

    // ==========================
    // STATES
    // ==========================

    const [tables, setTables] = useState([]);

    const [show, setShow] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [capacityFilter, setCapacityFilter] = useState("");

    const [formData, setFormData] = useState({

        tableNumber: "",

        capacity: "",

        tableStatus: "AVAILABLE"

    });


    // table  //

    const tableImages = {

    2: table2,

    4: table4,

    6: table6,

    8: table8,

    10: table10
 
};

    // ==========================
    // LOAD DATA
    // ==========================

    useEffect(() => {

        getTables();

    }, []);

    // ==========================
    // GET TABLES
    // ==========================

    const getTables = () => {

        axios

            .get("http://localhost:8080/restaurant-tables")

            .then((res) => {

                setTables(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    };

    // ==========================
    // MODAL
    // ==========================

    const handleShow = () => {

        setIsEdit(false);

        setEditId(null);

        setFormData({

            tableNumber: "",

            capacity: "",

            tableStatus: "AVAILABLE"

        });

        setShow(true);

    };

    const handleClose = () => {

        setShow(false);

    };

    // ==========================
    // HANDLE CHANGE
    // ==========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


        // ==========================
    // SAVE / UPDATE
    // ==========================

    const saveTable = () => {

        if (isEdit) {

            axios

                .put(

                    `http://localhost:8080/restaurant-tables/${editId}`,

                    formData

                )

                .then(() => {

                    getTables();

                    handleClose();

                })

                .catch((err) => {

                    console.log(err);

                });

        }

        else {

            axios

                .post(

                    "http://localhost:8080/restaurant-tables",

                    formData

                )

                .then(() => {

                    getTables();

                    handleClose();

                })

                .catch((err) => {

                    console.log(err);

                });

        }

    };

    // ==========================
    // EDIT
    // ==========================

    const editTable = (table) => {

        setIsEdit(true);

        setEditId(table.tableId);

        setFormData({

            tableNumber: table.tableNumber,

            capacity: table.capacity,

            tableStatus: table.tableStatus

        });

        setShow(true);

    };

    // ==========================
    // DELETE
    // ==========================

    const deleteTable = (id) => {

        if (!window.confirm("Delete this Table ?"))

            return;

        axios

            .delete(

                `http://localhost:8080/restaurant-tables/${id}`

            )

            .then(() => {

                getTables();

            })

            .catch((err) => {

                console.log(err);

            });

    };


    const totalTables = tables.length;

const availableTables = tables.filter(
    table => table.tableStatus === "AVAILABLE"
).length;

const reservedTables = tables.filter(
    table => table.tableStatus === "RESERVED"
).length;

const occupiedTables = tables.filter(
    table => table.tableStatus === "OCCUPIED"
).length;

    // ==========================
    // SEARCH
    // ==========================

   const filteredTables = tables.filter((table) => {

    const matchesSearch =
        table.tableNumber
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "" ||
        table.tableStatus === statusFilter;

    const matchesCapacity =
        capacityFilter === "" ||
        table.capacity.toString() === capacityFilter;

    return (
        matchesSearch &&
        matchesStatus &&
        matchesCapacity
    );

});

           return (

        <>

            <div className="container-fluid">

                <div className="card shadow-lg border-0">

                    {/* Header */}

                    <div className="card-header bg-primary text-white">

                        <div className="d-flex justify-content-between align-items-center">

                            <h3 className="mb-0">

                                <i className="bi bi-grid-3x3-gap-fill me-2"></i>

                                Restaurant Tables

                            </h3>

                            <Button

                                variant="light"

                                onClick={handleShow}

                            >

                                <i className="bi bi-plus-circle-fill me-2"></i>

                                Add Table

                            </Button>

                        </div>

                    </div>

                    {/*table  */}

<div>


 <div>
                    <div className="row mb-4">

    
    <div className="col-md-4">

        <div className="input-group">

            <span className="input-group-text">

                🔍

            </span>

            <input
                type="text"
                className="form-control"
                placeholder="Search Table..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
                setStatusFilter(e.target.value)
            }
        >

            <option value="">All Status</option>

            <option value="AVAILABLE">
                Available
            </option>

            <option value="RESERVED">
                Reserved
            </option>

            <option value="OCCUPIED">
                Occupied
            </option>

        </select>

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={capacityFilter}
            onChange={(e) =>
                setCapacityFilter(e.target.value)
            }
        >

            <option value="">All Capacity</option>

            <option value="2">2 Seats</option>

            <option value="4">4 Seats</option>

            <option value="6">6 Seats</option>

            <option value="8">8 Seats</option>

            <option value="10">10 Seats</option>

        </select>

    </div>
      </div>

   

<div className="row mb-4">

    <div className="col-md-3">

        <div className="card shadow-sm border-0">

            <div className="card-body text-center">

                <h6>Total Tables</h6>

                <h2 className="text-primary">
                    {totalTables}
                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card shadow-sm border-0">

            <div className="card-body text-center">

                <h6>Available</h6>

                <h2 className="text-success">
                    {availableTables}
                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card shadow-sm border-0">

            <div className="card-body text-center">

                <h6>Reserved</h6>

                <h2 className="text-warning">
                    {reservedTables}
                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-3">

        <div className="card shadow-sm border-0">

            <div className="card-body text-center">

                <h6>Occupied</h6>

                <h2 className="text-danger">
                    {occupiedTables}
                </h2>

            </div>

        </div>

    </div>

</div>

</div>






   {/* Cards */}

                        <div className="row">

                            {

                                filteredTables.map((table) => (

                                    <div

                                        className="col-lg-3 col-md-4 col-sm-6 mb-4"

                                        key={table.tableId}

                                    >

                                     <div
    className="card shadow border-0 h-100"
    style={{
        borderRadius: "18px",
        transition: "0.3s"
    }}
>

                                            <div className="card-body text-center">

                                                <div className="mb-3">

    <div className="position-relative">

    <img
        src={tableImages[table.capacity] || table4}
        alt={table.tableNumber}
        className="img-fluid rounded-top"
        style={{
            height: "180px",
            width: "100%",
            objectFit: "cover"
        }}
    />

    <span
        className={
            table.tableStatus === "AVAILABLE"
                ? "badge bg-success position-absolute top-0 end-0 m-2 px-3 py-2"

                : table.tableStatus === "RESERVED"
                ? "badge bg-warning text-dark position-absolute top-0 end-0 m-2 px-3 py-2"

                : "badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2"
        }
    >
        {table.tableStatus}
    </span>

</div>

</div>

                                                <h4 className="fw-bold text-primary mt-3">
    {table.tableNumber}
</h4>

                                                <hr />

                                            

                                                <span className="badge bg-info fs-6">

                                                    👥  {table.capacity}  Seats

                                                </span>







<div className="d-grid gap-2 mt-4">

    <button
        className={
            table.tableStatus === "AVAILABLE"
                ? "btn btn-primary"

                : table.tableStatus === "RESERVED"
                ? "btn btn-warning text-white"

                : "btn btn-danger"
        }
    >

        {
            table.tableStatus === "AVAILABLE"
                ? <Link

    to={`/restaurant-table/${table.tableId}`}

    className="btn btn-primary"

>

    🍽 Book Table

</Link>

                : table.tableStatus === "RESERVED"
                ? "Reserved"

                : "Occupied"
        }

    </button>

   <Link

    to={`/restaurant-table/${table.tableId}`}

    className="btn btn-outline-secondary"

>

    📖 View Menu

</Link>

</div>

   


                                                

                                                <div className="mt-4">

                                                    <Button

                                                        variant="warning"

                                                        size="sm"

                                                        className="me-2 rounded-circle"

                                                        onClick={() =>

                                                            editTable(table)

                                                        }

                                                    >

                                                        <i className="bi bi-pencil-fill"></i>

                                                    </Button>

                                                    <Button

                                                        variant="danger"

                                                        size="sm"

                                                        className="rounded-circle"

                                                        onClick={() =>

                                                            deleteTable(table.tableId)

                                                        }

                                                    >

                                                        <i className="bi bi-trash-fill"></i>

                                                    </Button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </div>
                      {/* ==========================
          MODAL
      ========================== */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
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

            {isEdit
              ? "Update Restaurant Table"
              : "Add Restaurant Table"}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form>

            <div className="row">

              {/* Table Number */}

              <div className="col-md-6 mb-3">

                <Form.Label>

                  Table Number

                </Form.Label>

                <Form.Control

                  type="text"

                  name="tableNumber"

                  value={formData.tableNumber}

                  onChange={handleChange}

                  placeholder="T-01"

                />

              </div>

              {/* Capacity */}

              <div className="col-md-6 mb-3">

                <Form.Label>

                  Capacity

                </Form.Label>

                <Form.Control

                  type="number"

                  name="capacity"

                  value={formData.capacity}

                  onChange={handleChange}

                  placeholder="4"

                />

              </div>

              {/* Status */}

              <div className="col-md-12 mb-3">

                <Form.Label>

                  Table Status

                </Form.Label>

                <Form.Select

                  name="tableStatus"

                  value={formData.tableStatus}

                  onChange={handleChange}

                >

                  <option value="AVAILABLE">

                    🟢 AVAILABLE

                  </option>

                  <option value="OCCUPIED">

                    🔴 OCCUPIED

                  </option>

                  <option value="RESERVED">

                    🟡 RESERVED

                  </option>

                </Form.Select>

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

            onClick={saveTable}

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

                ? "Update Table"

                : "Save Table"

            }

          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  </>

);

}