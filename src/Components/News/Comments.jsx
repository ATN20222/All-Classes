import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

const Comments = ({ newsId, comments, isOpen, onClose, onAddComment, onReplyComment }) => {
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null); 
    const [isReplying, setIsReplying] = useState(false);
    const inputRef = useRef(null);

    if (!isOpen) return null;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            if (isReplying && replyingTo && newComment.includes(`@${replyingTo.id}`)) {
                const replyData = {
                    
                    text: newComment,
                    replyTo: replyingTo.id,
                };
                onReplyComment(newsId, replyData); 
            } else {
                
                onAddComment(newsId, newComment); 
            }

            setNewComment(""); 
            setReplyingTo(null); 
            setIsReplying(false);
        }
    };

    const handleIsReply = (comment) => {
        setReplyingTo(comment); 
        setIsReplying(true); 
        setNewComment(`@${comment.id} `);
        
        if (inputRef.current) {
            inputRef.current.focus(); 
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
                                        <span>{comment.comment}</span>
                                    </div>
                                    <div className="CommentActions">
                                        {/* <span className="CommentLike">Like</span> */}
                                        <span className="CommentReply" onClick={() => handleIsReply(comment)}>
                                            Reply
                                        </span>
                                        <span className="CommentTime">{comment.created_at}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="AddCommentContainer">
                        <textarea
                            ref={inputRef}
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button className="AddCommentButton" onClick={handleAddComment}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;
