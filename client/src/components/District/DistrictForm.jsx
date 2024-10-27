import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSelect from './DistrictSelect';
import ButtonGroup from '../common/ButtonGroup';
import StatusToggle from '../common/StatusToggle';
import TextField from '../common/TextField';
import DistrictDropdown from './DistrictDropdown';

const DistrictForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [altname, setAltname] = useState('');
  const [code, setCode] = useState('');
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

const handleGetDistrict = () => {
    if (name) {
      axios.get(`http://localhost:5000/api/districts/${name}`)
        .then(async (response) => {
          const district = await response.data[0];
          setId(district._id);
          setName(district.name);
          setAltname(district.altName);
          setCode(district.code);
          setIsActive(district.isActive);
          setSelectedState(district.stateCode);
          alert("fetch successfull")
        })
        .catch((error) => {
          console.log("Error fetching district by ID:", error);
          alert("Error fetching the district. Please check the console for details.");
        });
    } else {
      alert('Please provide a name to fetch the district');
    }
  };
  
  const handleAddDistrict = () => {
    if (name && code && selectedState) {
      const newDistrict = {
        name,
        altName: altname,
        code,
        stateCode: selectedState,
        isActive
      };
      axios.post('http://localhost:5000/api/districts', newDistrict)
        .then(() => {
          fetchDistricts();
          clearDistrictForm();
          alert("District added successfully");
        })
        .catch((error) => {
          console.log("Error adding new district:", error);
          alert("Error adding the district. Please check the console for details.");
        });
    } else {
      alert('Name, Code, and State Code are required to add a new district');
    }
  };
  
  const handleUpdateDistrict = () => {
    if (id && name && code && selectedState) {
      const updatedDistrict = {
        name,
        altName: altname,
        code,
        stateCode: selectedState,
        isActive
      };
      axios.put(`http://localhost:5000/api/districts/${id}`, updatedDistrict)
        .then(() => {
          fetchDistricts();
          clearDistrictForm();
          alert("district updated successfully")
        })
        .catch((error) => {
          console.log("Error updating district:", error);
          alert("Error updating the district. Please check the console for details.");
        });
    } else {
      alert('ID, Name, Code, and State Code are required to update a district');
    }
  };
  
  const handleDeleteDistrict = () => {
    if (id) {
      axios.delete(`http://localhost:5000/api/districts/${id}`)
        .then(() => {
          fetchDistricts();
          clearDistrictForm();
          alert("district deleted successfully")
        })
        .catch((error) => {
          console.log("Error deleting district:", error);
          alert("Error deleting the district. Please check the console for details.");
        });
    } else {
      alert('ID is required to delete a district');
    }
  };
  
  const clearDistrictForm = () => {
    setId('');
    setName('');
    setAltname('');
    setCode('');
    setIsActive(false);
    setSelectedState('');
  };
  
  return (
    <main className="container-fluid p-4 w-100">
      <h3>District Master</h3>
      <hr />

      <form className='d-flex flex-column gap-3'>
        
        <DistrictDropdown countries={countries} states={states} setSelectedCountry={setSelectedCountry} setSelectedState={setSelectedState}/>
        <TextField label="ID" id="id" value={id} onChange={setId} readOnly />
        <TextField label="Name" id="name" value={name} onChange={setName} />
        <TextField label="Alt Name" id="altname" value={altname} onChange={setAltname} />
        <TextField label="Code" id="code" value={code} onChange={setCode} />
        <StatusToggle isActive={isActive} setIsActive={setIsActive} />
        <ButtonGroup handleAdd={handleAddDistrict} handleDelete={handleDeleteDistrict} handleUpdate={handleUpdateDistrict} handleGet={handleGetDistrict}/>
        
      </form>

      <DistrictSelect districts={districts} setName={setName}/>
    </main>
  );
};

export default DistrictForm;
