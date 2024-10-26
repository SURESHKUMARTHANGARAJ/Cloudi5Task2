import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelect from "./CountrySelect";

const CountryForm = () => {
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [altname, setAltname] = useState("");
  const [code, setCode] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  const handleGet = () => {
    if (name) {
      axios
        .get(`http://localhost:5000/api/countries/${name}`)
        .then(async (response) => {
          const country = await response.data[0];
          setId(country._id);
          setName(country.name);
          setAltname(country.altname);
          setCode(country.code);
          setIsActive(country.isActive);
          alert("Fetch Successfull");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAdd = () => {
    if (name && code) {
      const newCountry = { name, altname, code, isActive };
      axios
        .post("http://localhost:5000/api/countries", newCountry)
        .then(() => {
          fetchCountries();
          clearForm();
          alert("country added successfully");
        })
        .catch((error) => console.log(error));
    } else {
      alert("Name and Code are required to add a new country");
    }
  };

  const handleUpdate = () => {
    if (id && name && code) {
      const updatedCountry = { name, altname, code, isActive };
      axios
        .put(`http://localhost:5000/api/countries/${id}`, updatedCountry)
        .then(() => {
          fetchCountries();
          clearForm();
          alert("country updated successfully");
        })
        .catch((error) => console.log(error));
    } else {
      alert("ID, Name, and Code are required to update a country");
    }
  };

  const handleDelete = () => {
    if (id) {
      axios
        .delete(`http://localhost:5000/api/countries/${id}`)
        .then(() => {
          fetchCountries();
          clearForm();
          alert("country deleted successfully");
        })
        .catch((error) => {
          console.log("Delete request error: ", error);
          alert(
            "Error deleting the country. Please check the console for details."
          );
        });
    } else {
      alert("ID is required to delete a country");
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setAltname("");
    setCode("");
    setIsActive(false);
  };

  return (
    <main className="container-fluid p-4 w-100">
      <h3>Country Master</h3>
      <hr />

      <form className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="id">ID </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="altname">Alt Name</label>
          <input
            type="text"
            id="altname"
            value={altname}
            onChange={(e) => setAltname(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="checkbox"
            id="status"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span className="p-3">isActive</span>
        </div>

        <div className="buttons d-flex gap-2">
          <button type="button" onClick={handleGet}>
            GET
          </button>
          <button type="button" onClick={handleAdd}>
            ADD
          </button>
          <button type="button" onClick={handleUpdate}>
            UPDATE
          </button>
          <button type="button" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </form>

      <CountrySelect countries={countries} />
    </main>
  );
};

export default CountryForm;
