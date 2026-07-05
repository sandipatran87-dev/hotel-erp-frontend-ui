import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customer() {

  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    aadharNo: "",
    address: "",
    city: "",
    state: "",
    country: ""
  });

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {

    api.get("/customers")

      .then((res) => {
        setCustomers(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


const saveCustomer = () => {

  // Mobile Validation
  if (!/^[0-9]{10}$/.test(formData.mobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  if (editId) {

    api.put(`/customers/${editId}`, {
      customerId: editId,
      ...formData
    })
      .then(() => {

        alert("Customer Updated Successfully");

        getCustomers();

        setEditId(null);

        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          mobile: "",
          email: "",
          aadharNo: "",
          address: "",
          city: "",
          state: "",
          country: ""
        });

      })
      .catch(err => console.log(err));

  } else {

    api.post("/customers", formData)
      .then(() => {

        alert("Customer Added Successfully");

        getCustomers();

        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          mobile: "",
          email: "",
          aadharNo: "",
          address: "",
          city: "",
          state: "",
          country: ""
        });

      })
      .catch(err => console.log(err));
  }

};

const editCustomer = (customer) => {

  setEditId(customer.customerId);

  setFormData({
    firstName: customer.firstName,
    lastName: customer.lastName,
    gender: customer.gender,
    mobile: customer.mobile,
    email: customer.email,
    aadharNo: customer.aadharNo,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    country: customer.country
  });

};


  const deleteCustomer = (id) => {

    if (!window.confirm("Delete Customer ?")) return;

    api.delete(`/customers/${id}`)

      .then(() => {

        alert("Deleted Successfully");

        getCustomers();

      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

  <h2 className="mb-0">
    Customer Management
  </h2>

  <button
    className="btn btn-primary"
    onClick={() => {
      setEditId(null);

      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        mobile: "",
        email: "",
        aadharNo: "",
        address: "",
        city: "",
        state: "",
        country: ""
      });
    }}
  >
    + Add New Customer
  </button>

</div>

      {/* Form */}

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">
          Add Customer
        </div>


        <div className="card-body">

          <div className="row">

            <div className="col-md-3 mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-3">
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>MALE</option>
                <option>FEMALE</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="aadharNo"
                placeholder="Aadhar No"
                className="form-control"
                value={formData.aadharNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="state"
                placeholder="State"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

          </div>
<button
  className="btn btn-success"
  onClick={saveCustomer}
>
  {editId
    ? "Update Customer"
    : "Save Customer"}
</button>

        </div>

      </div>

      {/* Table */}

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          Customer List
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {customers.map((c) => (

                <tr key={c.customerId}>

                  <td>
                    {c.firstName} {c.lastName}
                  </td>

                  <td>{c.gender}</td>

                  <td>{c.mobile}</td>

                  <td>{c.email}</td>

                  <td>{c.city}</td>

                  <td>

                  <button
                   className="btn btn-warning btn-sm me-2"
                   onClick={() => editCustomer(c)}
                  >
                  Edit
                  </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteCustomer(c.customerId)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}