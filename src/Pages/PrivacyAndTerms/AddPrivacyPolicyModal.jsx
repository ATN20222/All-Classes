import React, { useState } from 'react';

const AddPrivacyPolicyModal = ({ isOpen, onClose, onAddPolicy }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (title.trim() === '') {
      validationErrors.title = 'Title is required';
    }
    if (description.trim() === '') {
      validationErrors.description = 'Description is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, call the onAddPolicy function
    onAddPolicy({ title, description });

    // Clear form fields and errors
    setTitle('');
    setDescription('');
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  if (!isOpen) return null;

  const ClearData = () => {
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Privacy Policy</h2>
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
            <label>
              <div className="ModalInputTitle">
                Title
              </div>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={handleInputChange(setTitle)}
              />
              {errors.title && <div className="text-danger PopUpError mt-0">{errors.title}</div>}
            </label>

            <label>
              <div className="ModalInputTitle">
                Description
              </div>
              <textarea
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={handleInputChange(setDescription)}
              />
              {errors.description && <div className="text-danger PopUpError mt-0">{errors.description}</div>}
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

export default AddPrivacyPolicyModal;
