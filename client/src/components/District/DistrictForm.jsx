import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSelect from './DistrictSelect';

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
          <input type="text" id="altname" value={altname} onChange={(e) => setAltname(e.target.value)} />
        </div>

        <div>
          <label htmlFor="code">Code</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input type="checkbox" id="status" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <span className='p-3'>isActive</span>
        </div>

        <div className="buttons d-flex gap-2">
          <button type="button" onClick={handleGetDistrict}>GET</button>
          <button type="button" onClick={handleAddDistrict}>ADD</button>
          <button type="button" onClick={handleUpdateDistrict}>UPDATE</button>
          <button type="button" onClick={handleDeleteDistrict}>DELETE</button>
        </div>
      </form>

      
      <DistrictSelect districts={districts} />
    </main>
  );
};

export default DistrictForm;
