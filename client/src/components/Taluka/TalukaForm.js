import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TalukaSelect from './TalukaSelect';

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
        {/* Country Select */}
        <div>
          <label htmlFor="country">Country Name</label>
          <select onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option 
                key={country._id} 
                value={country.code} 
                disabled={!country.isActive}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Select */}
        <div>
          <label htmlFor="state">State Name</label>
          <select onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option 
                key={state._id} 
                value={state.code} 
                disabled={!state.isActive}
              >
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div>
          <label htmlFor="district">District Name</label>
          <select onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option 
                key={district._id} 
                value={district.code} 
                disabled={!district.isActive}
              >
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} readOnly/>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="altname">Alt Name</label>
          <input type="text" id="altname" value={altName} onChange={(e) => setAltName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input type="checkbox" id="status" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span className='p-3'>isActive</span>
        </div>

        <div className="buttons d-flex gap-2">
          <button type="button" onClick={handleGetTaluka}>GET</button>
          <button type="button" onClick={handleAddTaluka}>ADD</button>
          <button type="button" onClick={handleUpdateTaluka}>UPDATE</button>
          <button type="button" onClick={handleDeleteTaluka}>DELETE</button>
        </div>
      </form>

      <TalukaSelect talukas={talukas} />
    </main>
  );
};

export default TalukaForm;
