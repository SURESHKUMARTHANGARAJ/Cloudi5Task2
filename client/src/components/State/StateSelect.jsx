import React from 'react';

const StateSelect = ({ states }) => {
  return (
    <div>
      <fieldset>
        <legend>Select State</legend>
        <select>
          <option value="">Select State</option>
          {states.map((state) => (
            <option 
              key={state._id} 
              value={state._id} 
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
