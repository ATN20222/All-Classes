import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AddBrandModal = ({ isOpen, onClose, onAddBrand }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};

    // Basic email regex pattern for format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === '') {
      validationErrors.name = 'Brand name is required';
    }
    if (email.trim() === '') {
      validationErrors.email = 'Vendor email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email format';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddBrand(name , email);
    
    setName('');
    setEmail('');
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
    setEmail('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Brand</h2>
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
                placeholder='Brand name'
                value={name}
                onChange={handleInputChange(setName)}
              />
              {errors.name && <div className="text-danger PopUpError mt-0">{errors.name}</div>}
            </label>

            <label>
                <div className="ModalInputTitle">
                    Vendor email
                </div>
              <input
                type="text"
                name="email"
                className='form-control'
                placeholder='Vendor email'
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              {errors.email && <div className="text-danger PopUpError mt-0">{errors.email}</div>}
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

export default AddBrandModal;
