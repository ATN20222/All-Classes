import React, { useState, useEffect } from "react";

const EditQuestionModal = ({
    isOpen,
    onClose,
    onEditQuestion,
    questionData,
}) => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [isRequired, setIsRequired] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && questionData) {
            setTitle(questionData.title || "");
            setQuestion(questionData.question || "");
            setIsRequired(questionData.required || false);
        }
    }, [isOpen, questionData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (title.trim() === "") {
            validationErrors.title = "Title is required";
        }

        if (question.trim() === "") {
            validationErrors.question = "Question is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onEditQuestion(questionData.id, title, question, isRequired);

        setTitle("");
        setQuestion("");
        setIsRequired(false);
        setErrors({});
        onClose();
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const ClearData = () => {
        setTitle("");
        setQuestion("");
        setIsRequired(false);
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="mymodal">
                <div className="modal-content">
                    <h2>Edit Question</h2>
                    <form className="add-class-form addAdminForm" onSubmit={handleSubmit}>
                        <label>
                            <div className="ModalInputTitle">Title</div>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={handleInputChange(setTitle)}
                            />
                            {errors.title && (
                                <div className="text-danger PopUpError mt-0">
                                    {errors.title}
                                </div>
                            )}
                        </label>

                        <label>
                            <div className="ModalInputTitle">Question</div>
                            <textarea
                                name="question"
                                className="form-control"
                                placeholder="Question"
                                value={question}
                                onChange={handleInputChange(setQuestion)}
                            />
                            {errors.question && (
                                <div className="text-danger PopUpError mt-0">
                                    {errors.question}
                                </div>
                            )}
                        </label>

                        <div className="form-check d-flex align-items-center pt-2">
                            <input
                                className="form-check-input "
                                type="checkbox"
                                id="isRequired"
                                checked={isRequired}
                                onChange={() => setIsRequired(!isRequired)}
                            />
                            <label className="form-check-label p-1 pt-2" htmlFor="isRequired">
                                Required
                            </label>
                        </div>

                        <div className="form-buttons AllClassesBtn ApplicationButtons">
                            <button className="ModalBtn" type="submit">
                                Save
                            </button>
                            <button
                                className="ModalBtn"
                                type="button"
                                onClick={() => {
                                    onClose();
                                    ClearData();
                                }}
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

export default EditQuestionModal;
