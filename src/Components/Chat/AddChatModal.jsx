import React, { useEffect, useState } from 'react';
import userImage from '../../Assets/Images/Avatar.svg';

const AddChatModal = ({ isOpen, onClose, onAddMembers, membersData }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setSelectedMembers([]);
            setErrors({});
            setName('');
        }
    }, [isOpen]);

    const handleCheckboxChange = (memberId) => {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(memberId)
                ? prevSelected.filter((id) => id !== memberId)
                : [...prevSelected, memberId]
        );
        setErrors({});
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (selectedMembers.length === 0) {
            newErrors.members = 'At least one member must be selected.';
        }

        if (selectedMembers.length > 1 && name.trim() === '') {
            newErrors.name = 'Please provide a chat name for group chats.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Transform selected members to the required format
        const formattedMembers = selectedMembers.map((memberId) => ({
            member_id: memberId,
        }));

        onAddMembers(formattedMembers, name);

        setSelectedMembers([]);
        setName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Select Members</h2>
                    <form className="add-class-form addMembersForm" onSubmit={handleSubmit}>
                        <div className="members-list">
                            {membersData.map((member) => (
                                <label key={member.id} className="member-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedMembers.includes(member.id)}
                                        onChange={() => handleCheckboxChange(member.id)}
                                    />
                                    <img
                                        src={member.avatar || userImage}
                                        alt={`${member.member?.first_name} ${member.member?.last_name}`}
                                        className="member-avatar"
                                    />
                                    <span>{`${member.member?.first_name} ${member.member?.last_name}`}</span>
                                </label>
                            ))}
                        </div>
                        {errors.members && (
                            <div className="text-danger PopUpError mt-0">{errors.members}</div>
                        )}

                        {selectedMembers.length > 1 && (
                            <label>
                                <div className="ModalInputTitle">Name</div>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter chat name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                {errors.name && <div className="text-danger PopUpError mt-0">{errors.name}</div>}
                            </label>
                        )}

                        <div className="form-buttons AllClassesBtn ApplicationButtons">
                            <button className="ModalBtn" type="submit">
                                Create
                            </button>
                            <button
                                className="ModalBtn"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddChatModal;
