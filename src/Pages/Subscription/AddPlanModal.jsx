import React, { useState } from 'react';

const AddPlanModal = ({ isOpen, onClose, onAddPlan }) => {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [planDetails, setPlanDetails] = useState('');
  const [frequency, setFrequency] = useState('');
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
    if (frequency === '') {
      validationErrors.frequency = 'Frequency is required';
    }
    if (planDetails.trim() === '') {
      validationErrors.planDetails = 'Plan details are required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Send data including frequency
    onAddPlan(planName, price, planDetails, frequency);

    // Clear form and errors after submission
    setPlanName('');
    setPrice('');
    setPlanDetails('');
    setFrequency('');
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  if (!isOpen) return null;

  const clearData = () => {
    setPlanName('');
    setPrice('');
    setPlanDetails('');
    setFrequency('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Add Plan</h2>
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
                type="number"
                name="price"
                className='form-control'
                placeholder='Price'
                value={price}
                onChange={handleInputChange(setPrice)}
              />
              {errors.price && <div className="text-danger PopUpError mt-0">{errors.price}</div>}
            </label>

            <label>
              <div className="ModalInputTitle">Plan Frequency</div>
              <select
                name="frequency"
                className="form-select"
                value={frequency}
                onChange={handleInputChange(setFrequency)}
              >
                <option value="">Select frequency</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
              {errors.frequency && <div className="text-danger PopUpError mt-0">{errors.frequency}</div>}
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
              <button className="ModalBtn" type="button" onClick={() => { onClose(); clearData(); }}>
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
