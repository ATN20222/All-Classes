import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import { QuestionsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";

const Questions = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await QuestionsService.List();
            setQuestions(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddQuestion = async (title, question, isRequired) => {
        try {
            await QuestionsService.Add(title, question, isRequired);
            toast.success('Question added successfully');
            getData();
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const handleEditQuestion = async (id, title, question, isRequired) => {
        try {
            await QuestionsService.Edit(id, title, question, isRequired);
            toast.success('Question updated successfully');
            getData();
        } catch (error) {
            toast.error(`${error}`);
        }
    };


    return (
        <div className="MainContent Applications">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>

            <AddQuestionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddQuestion={handleAddQuestion}
            />

            <EditQuestionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEditQuestion={handleEditQuestion}
                questionData={selectedQuestion}
            />

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary p-3">
                        <div className="AddIconContainer nav-link"
                            onClick={() => setIsAddModalOpen(true)}>
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Questions
                    </div>
                </div>

                <div className="NewsRow">
                    <div className="PrivacyContainer">
                        {questions.map((row) => (
                            <div className="PrivacyItem" key={row.id}>
                                <h6 className="PolicyHeader">
                                    <div>{row.title}</div>
                                    <div className="DeletIcon" onClick={() => {
                                        setSelectedQuestion(row);
                                        setIsEditModalOpen(true);
                                    }}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </div>
                                </h6>
                                <span>{row.question}</span>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
