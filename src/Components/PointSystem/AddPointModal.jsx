import React, { useEffect, useState } from 'react';

const AddPointModal = ({ isOpen, onClose, onEditPoint ,data }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(()=>{
    setName(data.display_name);
    setPoints(data.points);
  },[data])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (name.trim() === '') {
      validationErrors.name = 'action is required';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, call the onAddAdmin function
    onEditPoint( data.id, points , data.display_name ,data.action );
    
    // Clear form fields and errors
    setName('');
    setPoints('');
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  if (!isOpen) return null;

  const ClearData = () => {
    setName('');
    setPoints('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Point</h2>
          {/* <div className="FormHr"></div> */}
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
            <label>
                <div className="ModalInputTitle">
                    Name
                </div>
              <input
                type="text"
                name="name"
                className='form-control'
                placeholder='Name'
                disabled
                value={name}
                // onChange={handleInputChange(setName)}
              />
              {errors.name && <div className="text-danger PopUpError mt-0">{errors.name}</div>}
            </label>

            <label>
                <div className="ModalInputTitle">
                    Points
                </div>
              <input
                type="number"
                name="points"
                className='form-control'
                placeholder='Points'
                value={points}
                onChange={handleInputChange(setPoints)}
              />
              {errors.points && <div className="text-danger PopUpError mt-0">{errors.points}</div>}
            </label>


            <div className="form-buttons AllClassesBtn ApplicationButtons">
              <button className="ModalBtn" type="submit">
                Save
              </button>
              <button className="ModalBtn" type="button" onClick={() => { onClose(); ClearData(); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPointModal;
