import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AddBrandModal = ({ isOpen, onClose, onAddBrand }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (name.trim() === '') {
      validationErrors.name = 'brand name is required';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddBrand(name);
    
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
          <h2>Add Brand</h2>
          {/* <div className="FormHr"></div> */}
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
            <label htmlFor="BrandImage" className='FormImageAvatarLabel'>
                <input type="file" id='BrandImage' className='d-none' />
                <div className="FormImageAvatar">
                    <FontAwesomeIcon icon={faImage}/>
                </div>
            </label>
            <label>
                <div className="ModalInputTitle">
                    Brand name
                </div>
              <input
                type="text"
                name="name"
                className='form-control'
                placeholder='brand name'
                value={name}
                onChange={handleInputChange(setName)}
              />
              {errors.name && <div className="text-danger PopUpError mt-0">{errors.name}</div>}
            </label>

            {/* <label>
                <div className="ModalInputTitle">
                    Start date
                </div>
              <input
                type="date"
                name="points"
                className='form-control'
                placeholder='Points'
                value={points}
                onChange={handleInputChange(setPoints)}
              />
              {errors.points && <div className="text-danger PopUpError mt-0">{errors.points}</div>}
            </label> */}


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

export default AddBrandModal;
