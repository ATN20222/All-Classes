import React, { useState } from 'react';

const DeleteModalComponent = ({ id, isOpen, onClose, onDelete }) => {
 
    const handleSubmit = (e) => {
        e.preventDefault();
        onDelete(id);
        onClose();
      };
    

  if (!isOpen) return null;



  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h2>Confirm Delete</h2>
          {/* <div className="FormHr"></div> */}
          <div className="add-class-form addAdminForm">
            
            <h5>Are you sure you want delete ?</h5>


              <div className="form-buttons AllClassesBtn ApplicationButtons">
              <button className="ModalBtn" type="button" onClick={handleSubmit}>
                Yes
              </button>
              <button className="ModalBtn" type="button" onClick={onClose }>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalComponent ;
