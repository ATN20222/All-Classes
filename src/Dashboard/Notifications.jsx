import React, { useState } from "react";

// Sample notification data array


const Notifications = ({notificationsData}) => {
    const [expanded, setExpanded] = useState({}); // State to handle expanded notifications

    // Toggle function for Show More / Show Less
    const toggleShowMore = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    // const notificationsData = [
    //     {
    //         id: 1,
    //         title: "New payment received",
    //         time: "5 minutes ago",
    //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque cumque, soluta nobis quas voluptatem deserunt officia libero doloremque accusantium est dolorum odio sequi dignissimos reiciendis, debitis animi nemo esse impedit.",
    //     },
    //     {
    //         id: 2,
    //         title: "Subscription updated",
    //         time: "10 minutes ago",
    //         text: "Your subscription has been successfully updated to the Premium plan. Enjoy exclusive benefits and priority support from our team.",
    //     },
    //     {
    //         id: 3,
    //         title: "Weekly report available",
    //         time: "1 hour ago",
    //         text: "Your weekly performance report for the last 7 days is now available. Check it out to see how you're doing and track your progress!",
    //     },
    // ];

    return (
        <div className="Notifications">
            {notificationsData.length>0?notificationsData.map((notification) => {
                const isExpanded = expanded[notification.id];
                const text = notification.body;

                const displayText = isExpanded ? text : `${text.substring(0, 70)}${text.length > 70 ? "..." : ""}`;

                return (
                    <div key={notification.id} className="NotificationItem">
                        <div className="NotificationItemTitleAndTime">
                            <span className="NotificationItemTitle">{notification.title}</span>
                            <span className="NotificationItemTime">{notification.time}</span>
                        </div>
                        <div className="NotificationText">
                            <span>{displayText}</span>
                            {text.length > 70 && (
                                <button
                                    onClick={() => toggleShowMore(notification.id)}
                                    className="ShowMoreButton"
                                    style={{
                                        border: "none",
                                        background: "none",
                                        color: "#00aaff",
                                        cursor: "pointer",
                                        paddingLeft: "5px",
                                    }}
                                >
                                    {isExpanded ? "Show Less" : "Show More"}
                                </button>
                            )}
                        </div>
                    </div>
                );
            }):
            <div className="mt-5">No recent notifications</div>
            }
        </div>
    );
};

export default Notifications;
