import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import userImage from '../../Assets/Images/Avatar.svg'
const PostsComments = ({ newsId, comments=[], isOpen, onClose ,onDeleteComment }) => {
    if (!isOpen) return null;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="CommentsModal">
                <div className="CommentsContainer" onClick={stopPropagation}>
                    <div className="CommentsHeader">
                        <span>Comments</span>
                    <div className="CommentsHr mt-3"></div>
                    </div>
                    <div className="AllComments">
                        {comments.map((comment) => (
                            <>
                            <div className="Comment" key={comment.id}>
                                <div className="CommenterImage">
                                    <div className="Avatar">
                                        <img src={comment.image?comment.image:userImage} width="100%" alt="" />
                                    </div>
                                </div>
                                <div className="CommentTextAndActions">
                                    <div className="CommentText">
                                        <h6>{comment.user.name}</h6>
                                        <span>{comment.comment}</span>
                                    </div>
                                    <div className="CommentActions">
                                        
                                        <span className="CommentReply" onClick={() => onDeleteComment(comment.id)}>
                                            Delete
                                        </span>
                                        <span className="CommentTime">{comment.created_at}</span>
                                    </div>
                                </div>
                                
                            </div>
                            
                            </>
                            
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default PostsComments;
