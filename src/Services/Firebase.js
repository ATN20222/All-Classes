// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setFCM } from "./AxiosApi";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCC4APmZVN5DjWIiydewwXASBXTAWQwXTU",
    authDomain: "all-classes-497cb.firebaseapp.com",
    databaseURL: "https://all-classes-497cb.firebaseio.com",
    projectId: "all-classes-497cb",
    storageBucket: "all-classes-497cb.appspot.com",
    messagingSenderId: "1084716750056",
    appId: "1:1084716750056:web:0b6875fe30db7755e0e55d",
    measurementId: "G-Y186M58YFT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Request permission for notifications
export const requestNotificationPermission = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: "BCvPC_Z51qrtDEZs0sUf_3zXX0giALDB8sc02GCcZGGB6SMr7rlbFpZY_tsZ7D3wDxNxDdslrZxJ578WfBcPGQU" });
        if (token) {
            console.log("FCM Token:", token);
            setFCM(token);
            // Send this token to your backend to send push notifications
        } else {
            console.log("No registration token available. Request permission to generate one.");
        }
    } catch (error) {
        console.error("Error retrieving FCM token:", error);
    }
};

// Listener for receiving messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            resolve(payload);
        });
    });
