import React, { useEffect, useState } from 'react';
import './Modal.css';
import { AdminsService } from '../../Services/Api';

const EditAdminModal = ({ id , isOpen, onClose, onEditAdmin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [managements] = useState([
    "news", 
    "events", 
    "buy-and-sell", 
    "jobs",
    "forms", 
    "admins",
    "members",
    "terms-and-conditions",
    "privacy-policy",
    "about",
    "rewards",
    "questions",
    "chats",
    "chat-rooms",

  ]);   

  
  
  // management start mind

  const [selectedManagements, setSelectedManagements] = useState([]);

  const [errors, setErrors] = useState({});
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await AdminsService.GetById(id);
            console.log(response);
            setName(response.content.name || '');  
            setEmail(response.content.email || '');
            const manage = response.content.permissions.map(permission => permission.name);
            setSelectedManagements(manage);

            
        } catch (error) {
            console.error(error);
        }
    }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    console.log(name);
    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }
    if (email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    if(selectedManagements.length===0){
      validationErrors.selectedManagements = 'You must select at least one';

    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Pass selected managements along with other form data
    onEditAdmin(id,{ name, email, managments: selectedManagements });

    // Clear form fields and errors
    setName('');
    setEmail('');
    setPassword('');
    setSelectedManagements([]); // Clear selected managements
    setErrors({});
    onClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleManagementChange = (management) => {
    setSelectedManagements((prevSelected) => {
      if (prevSelected.includes(management)) {
        return prevSelected.filter((m) => m !== management);
      } else {
        return [...prevSelected, management];
      }
    });
  };

  if (!isOpen) return null;

  const ClearData = () => {
    setName('');
    setEmail('');
    setPassword('');
    setSelectedManagements([]);
    setErrors({});
  };

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Edit Admin</h2>
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
                value={name}
                onChange={handleInputChange(setName)}
              />
              {errors.name && <div className="text-danger PopUpError mt-0">{errors.name}</div>}
            </label>

            <label>
                <div className="ModalInputTitle">
                    Email
                </div>
              <input
                type="email"
                name="email"
                className='form-control'
                placeholder='Email'
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              {errors.email && <div className="text-danger PopUpError mt-0">{errors.email}</div>}
            </label>

            {/* <label>
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
            </label> */}

            <div className="Managements">
              <div className="ModalInputTitle">Managements</div>
              <div className="CheckBoxes">

                {managements.map((management) => (
                  <div key={management} className="form-check mb-2"> {/* Bootstrap form-check class */}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={management}
                      value={management}
                      checked={selectedManagements.includes(management)}
                      onChange={() => handleManagementChange(management)}
                    />
                    <label className="form-check-label" htmlFor={management}>
                      {management}
                    </label>
                  </div>
                ))}
              </div>
              {errors.selectedManagements && <div className="text-danger PopUpError mt-0">{errors.selectedManagements}</div>}

            </div>

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

export default EditAdminModal;
