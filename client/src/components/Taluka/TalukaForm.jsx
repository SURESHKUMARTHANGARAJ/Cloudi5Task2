import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TalukaSelect from './TalukaSelect';
import ButtonGroup from '../common/ButtonGroup';
import TextField from '../common/TextField';
import StatusToggle from '../common/StatusToggle';
import TalukaDropdown from './TalukaDropdown';

const TalukaForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [altName, setAltName] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) fetchTalukas();
  }, [selectedDistrict]);

  const fetchCountries = () => {
    axios.get('http://localhost:5000/api/countries')
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  const fetchStates = () => {
    axios.get(`http://localhost:5000/api/states/country/${selectedCountry}`)
      .then((response) => setStates(response.data))
      .catch((error) => console.log(error));
  };

  const fetchDistricts = () => {
    axios.get(`http://localhost:5000/api/districts/state/${selectedState}`)
      .then((response) => setDistricts(response.data))
      .catch((error) => console.log(error));
  };

  const fetchTalukas = () => {
    axios.get(`http://localhost:5000/api/talukas/district/${selectedDistrict}`)
      .then((response) => setTalukas(response.data))
      .catch((error) => console.log(error));
  };
 
  const handleGetTaluka = () => {
    if (name) {
      axios.get(`http://localhost:5000/api/talukas/${name}`)
        .then(async (response) => {
          const taluka = await response.data[0];
          setId(taluka._id);
          setName(taluka.name);
          setAltName(taluka.altName);
          setIsActive(taluka.isActive);
          setSelectedDistrict(taluka.districtCode);
          alert("Taluka Fetched Successfully")
        })
        .catch((error) => console.log("Error fetching Taluka by ID:", error));
    }
  };
  
  const handleAddTaluka = () => {
    if (name && selectedDistrict) {
      const newTaluka = { name, altName, districtCode: selectedDistrict, isActive };
      axios.post('http://localhost:5000/api/talukas', newTaluka)
        .then(() => {
          fetchTalukas(); 
          clearForm();
          alert("Taluka Added successfully")
        })
        .catch((error) => console.log("Error adding Taluka:", error));
    } else {
      alert('Name, Code, and District Code are required to add a new taluka');
    }
  };
  
  const handleUpdateTaluka = () => {
    if (id && name && selectedDistrict) {
      const updatedTaluka = { name, altName, districtCode: selectedDistrict, isActive };
      axios.put(`http://localhost:5000/api/talukas/${id}`, updatedTaluka)
        .then(() => {
          fetchTalukas(); 
          clearForm();
          alert("Taluka Updated successfully")
        })
        .catch((error) => console.log("Error updating Taluka:", error));
    } else {
      alert('ID, Name, and District Code are required to update a taluka');
    }
  };
  
  const handleDeleteTaluka = () => {
    if (id) {
      axios.delete(`http://localhost:5000/api/talukas/${id}`)
        .then(() => {
          fetchTalukas();
          clearForm();
          alert("Taluka deleted successfully")
        })
        .catch((error) => {
          console.log("Delete request error:", error);
          alert("Error deleting the taluka. Please check the console for details.");
        });
    } else {
      alert('ID is required to delete a taluka');
    }
  };
  
  const clearForm = () => {
    setId('');
    setName('');
    setAltName('');
    setIsActive(false);
    setSelectedDistrict(null);
  };
  
  return (
    <main className="container-fluid p-4 w-100">
      <h3>Taluka Master</h3>
      <hr />

      <form className='d-flex flex-column gap-3'>
        
        <TalukaDropdown countries={countries} states={states} districts={districts} setSelectedCountry={setSelectedCountry} setSelectedState={setSelectedState} setSelectedDistrict={setSelectedDistrict} />
        <TextField label="ID" id="id" value={id} onChange={setId} readOnly />
        <TextField label="Name" id="name" value={name} onChange={setName} />
        <TextField label="Alt Name" id="altname" value={altName} onChange={setAltName} />
        <StatusToggle isActive={isActive} setIsActive={setIsActive} />
        <ButtonGroup handleAdd={handleAddTaluka} handleDelete={handleDeleteTaluka} handleUpdate={handleUpdateTaluka} handleGet={handleGetTaluka}/>
      </form>

      <TalukaSelect talukas={talukas} setName={setName}/>
    </main>
  );
};

export default TalukaForm;
