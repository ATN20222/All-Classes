import React, { useState } from 'react';

const AddPlanModal = ({ isOpen, onClose, onAddPlan }) => {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [planDetails, setPlanDetails] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (planName.trim() === '') {
      validationErrors.planName = 'Plan name is required';
    }
    if (price.trim() === '') {
      validationErrors.price = 'Price is required';
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      validationErrors.price = 'Price must be a positive number';
    }
    if (planDetails.trim() === '') {
      validationErrors.planDetails = 'Plan details are required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, call the onAddPlan function
    onAddPlan({ planName, price, planDetails });
    
    // Clear form fields and errors
    setPlanName('');
    setPrice('');
    setPlanDetails('');
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  if (!isOpen) return null;

  const ClearData = () => {
    setPlanName('');
    setPrice('');
    setPlanDetails('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Plan</h2>
          {/* <div className="FormHr"></div> */}
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
            <label>
              <div className="ModalInputTitle">Plan Name</div>
              <input
                type="text"
                name="planName"
                className='form-control'
                placeholder='Plan Name'
                value={planName}
                onChange={handleInputChange(setPlanName)}
              />
              {errors.planName && <div className="text-danger PopUpError mt-0">{errors.planName}</div>}
            </label>

            <label>
              <div className="ModalInputTitle">Price</div>
              <input
                type="text"
                name="price"
                className='form-control'
                placeholder='Price'
                value={price}
                onChange={handleInputChange(setPrice)}
              />
              {errors.price && <div className="text-danger PopUpError mt-0">{errors.price}</div>}
            </label>

            <label>
              <div className="ModalInputTitle">Plan Details</div>
              <textarea
                name="planDetails"
                className='form-control'
                placeholder='Plan Details'
                value={planDetails}
                onChange={handleInputChange(setPlanDetails)}
              />
              {errors.planDetails && <div className="text-danger PopUpError mt-0">{errors.planDetails}</div>}
            </label>

            <div className="form-buttons AllClassesBtn mt-3 justify-content-evenly">
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

export default AddPlanModal;
