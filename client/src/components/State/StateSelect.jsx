import React from 'react';

const StateSelect = ({ states, setName }) => {
  return (
    <div>
      <fieldset>
        <legend>Select State</legend>
        <select onChange={(e)=>setName(e.target.value)}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option 
              key={state._id} 
              value={state.name} 
              disabled={!state.isActive}
            >
              {state.name}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

export default StateSelect;
