import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Comments = ({ comments, isOpen, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState("");

    if (!isOpen) return null;

    // Function to stop event propagation
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment(""); // Clear the input after submitting
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="CommentsModal">
                <div className="CommentsContainer" onClick={stopPropagation}>
                    <div className="CommentsHeader">
                        <span>Comments</span>
                    </div>
                    <div className="CommentsHr"></div>
                    <div className="AllComments">
                        {comments.map((comment) => (
                            <div className="Comment" key={comment.id}>
                                <div className="CommenterImage">
                                    <div className="Avatar">
                                        <img src={comment.image} width="100%" alt="" />
                                    </div>
                                </div>
                                <div className="CommentTextAndActions">
                                    <div className="CommentText">
                                        <h6>{comment.name}</h6>
                                        <span>{comment.text}</span>
                                    </div>
                                    <div className="CommentActions">
                                        <span className="CommentLike">Like</span>
                                        <span className="CommentReply">Reply</span>
                                        <span className="CommentTime">5m</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="AddCommentContainer">
                        <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button className="AddCommentButton" onClick={handleAddComment}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
