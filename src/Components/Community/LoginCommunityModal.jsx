import React, { useState } from 'react';

const LoginCommunityModal = ({ id ,isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    if (password.trim()==='') {
        validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onLogin(id,password);
    setPassword('');
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };



  if (!isOpen) return null;

  const ClearData = () => {
    setPassword('');
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Login to Community</h2>
          <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>

            <label>
                <div className="ModalInputTitle">
                    Password
                </div>
              <input
                type="password"
                name="password"
                className='form-control'
                placeholder='Password'
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              {errors.password && <div className="text-danger PopUpError mt-0">{errors.password}</div>}
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

export default LoginCommunityModal;
