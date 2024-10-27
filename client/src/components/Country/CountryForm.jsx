import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "../common/ButtonGroup";
import TextField from "../common/TextField";
import StatusToggle from "../common/StatusToggle";
import CountrySelect from './CountrySelect'

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
        <TextField label="ID" id="id" value={id} onChange={setId} readOnly />
        <TextField label="Name" id="name" value={name} onChange={setName} />
        <TextField label="Alt Name" id="altname" value={altname} onChange={setAltname} />
        <TextField label="Code" id="code" value={code} onChange={setCode} />
        <StatusToggle isActive={isActive} setIsActive={setIsActive} />
        <ButtonGroup
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleGet={handleGet}
        />
      </form>

      <CountrySelect countries={countries} setName={setName}/>
    </main>
  );
};

export default CountryForm;
