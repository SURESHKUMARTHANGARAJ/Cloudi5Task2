import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StateSelect from './StateSelect';


const StateForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [altname, setAltname] = useState('');
  const [code, setCode] = useState('');
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    fetchCountries();
  }, []);
  
  useEffect(() => {
    fetchStates();
  },[selectedCountry]);

  const fetchCountries = () => {
    axios.get('http://localhost:5000/api/countries')
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  const fetchStates = () => {
    if (selectedCountry) {
      axios.get(`http://localhost:5000/api/states/country/${selectedCountry}`)
        .then((response) => {
            if(response.data.length){
            setStates(response.data)
            }else{
                setStates([]);
            }
    })
        .catch((error) => {
            console.log(error);
        })
    }
  };

  const handleGet = () => {
    if (name) {
      axios.get(`http://localhost:5000/api/states/${name}`)
        .then(async(response) => {
          const state = await response.data[0];
          setName(state.name);
          setId(state._id);
          setAltname(state.altName);
          setCode(state.code);
          setIsActive(state.isActive);
          setSelectedCountry(state.countrycode);
          alert("Fetch successfully")
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAdd = () => {
    if (name && code && selectedCountry) {
      const newState = { name, altName:altname, code, countrycode: selectedCountry, isActive };
      axios.post('http://localhost:5000/api/states', newState)
        .then(() => {
          fetchStates();
          clearForm();
          alert("State added successfully")
        })
        .catch((error) => console.log(error));
    } else {
      alert('Name, Code, and Country Code are required to add a new state');
    }
  };

  const handleUpdate = () => {
    if (id && name && code && selectedCountry) {
      const updatedState = { name, altName:altname, code, countrycode: selectedCountry, isActive };
      axios.put(`http://localhost:5000/api/states/${id}`, updatedState)
        .then(() => {
          fetchStates();
          clearForm();
          alert("State Updated Successfully")
        })
        .catch((error) => console.log(error));
    } else {
      alert('ID, Name, Code, and Country Code are required to update a state');
    }
  };

  const handleDelete = () => {
    if (id) {
      axios.delete(`http://localhost:5000/api/states/${id}`)
        .then(() => {
          fetchStates();
          clearForm();
          alert("State Deleted Successfully")
        })
        .catch((error) => {
          console.log("Delete request error: ", error);
          alert("Error deleting the state. Please check the console for details.");
        });
    } else {
      alert('ID is required to delete a state');
    }
  };

  const clearForm = () => {
    setId('');
    setName('');
    setAltname('');
    setCode('');
    setIsActive(false);
    setSelectedCountry('');
  };

  return (
    <main className="container-fluid p-4 w-100">
      <h3>State Master</h3>
      <hr />

      <form className='d-flex flex-column gap-3'>

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
          <button type="button" onClick={handleGet}>GET</button>
          <button type="button" onClick={handleAdd}>ADD</button>
          <button type="button" onClick={handleUpdate}>UPDATE</button>
          <button type="button" onClick={handleDelete}>DELETE</button>
        </div>

      </form>

      <StateSelect states={states}/>

    </main>
  );
};

export default StateForm;
