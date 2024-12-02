import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const AddBrandModal = ({ isOpen, onClose, onAddBrand }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
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
    if (!image) {
      validationErrors.image = 'Brand image is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Pass the brand details to the parent component
    onAddBrand(name, email, image);

    // Clear the form
    setName('');
    setEmail('');
    setImage(null);
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  if (!isOpen) return null;

  const ClearData = () => {
    setName('');
    setEmail('');
    setImage(null);
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Brand</h2>
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
            <label htmlFor="BrandImage" className='FormImageAvatarLabel'>
              <input
                type="file"
                id='BrandImage'
                className='d-none'
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="FormImageAvatar">
                <FontAwesomeIcon icon={faImage} />
              </div>
            </label>
            {errors.image && <div className="text-danger PopUpError mt-0">{errors.image}</div>}

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
