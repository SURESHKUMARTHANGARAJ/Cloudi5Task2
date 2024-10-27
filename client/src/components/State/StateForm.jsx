import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StateSelect from './StateSelect';
import ButtonGroup from '../common/ButtonGroup';
import StatusToggle from '../common/StatusToggle';
import TextField from '../common/TextField';
import StateDropdown from './StateDropdown';


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

        <StateDropdown countries={countries} setSelectedCountry={setSelectedCountry} />
        <TextField label="ID" id="id" value={id} onChange={setId} readOnly />
        <TextField label="Name" id="name" value={name} onChange={setName} />
        <TextField label="Alt Name" id="altname" value={altname} onChange={setAltname} />
        <TextField label="Code" id="code" value={code} onChange={setCode} />
        <StatusToggle isActive={isActive} setIsActive={setIsActive} />
        <ButtonGroup handleAdd={handleAdd} handleDelete={handleDelete} handleUpdate={handleUpdate} handleGet={handleGet}/>

      </form>

      <StateSelect states={states} setName={setName}/>

    </main>
  );
};

export default StateForm;
