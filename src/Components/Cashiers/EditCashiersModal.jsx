import React, { useEffect, useState } from 'react';
import { BrandsService } from '../../Services/Api';
const EditCashiersModal = ({ isOpen,data , onClose, onAddCashier }) => {
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        setEmail(data.email);
        setName(data.name)
    }, [data])

  // const [brand, setBrand] = useState('');
  // const [brands, setBrands] = useState([]);
  
//   useEffect(()=>{
//     getBrands();
// },[]);

// async function getBrands() {
//     try {
//         const response = await BrandsService.List();
//         setBrands(response.content);
//     } catch (error) {
//         console.error(error);
//     }
// }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (name.trim() === '') {
      validationErrors.name = 'Name is required';
    }
    if (email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (password.trim() === '') {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    // if(brand.trim()==='')
    //   validationErrors.brand = 'Brand is required';


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddCashier(name, email , password);
    
    setName('');
    setEmail('');
    setPassword('');
    // setBrand('');
    // setBrands([]);
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
    setPassword('');
    setErrors({});
  };

  

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Edit Cashier</h2>
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
            {/* <label htmlFor="">
                <div className="ModalInputTitle">
                    Brand
                </div>
                
                <select 
                    className="form-select" 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                >
                    <option value="">Brand</option>
                    {brands.map((brand)=>(
                        <option value={brand.id}>{brand.name}</option>
                    
                    ))}
                            </select>
                            {errors.brand && <div className="text-danger PopUpError mt-0">{errors.brand}</div>}

            </label> */}


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
            <div className="ResendPassword text-start p-2">
            <span>Resend Password</span>
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

export default EditCashiersModal;
