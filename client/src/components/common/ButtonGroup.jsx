import React from 'react'

const ButtonGroup = ({handleGet,handleAdd,handleUpdate,handleDelete}) => {
  return (
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
  )
}

export default ButtonGroup
