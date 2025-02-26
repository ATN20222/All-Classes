// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setFCM } from "./AxiosApi";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuOTbxvFca1wSVTBh3tpuyRujGgd4JAsI",
    authDomain: "all-classes-497cb.firebaseapp.com",
    projectId: "all-classes-497cb",
    storageBucket: "all-classes-497cb.firebasestorage.app",
    messagingSenderId: "356000361810",
    appId: "1:356000361810:web:e61caf9234726144d95e8b",
    measurementId: "G-H08FW0YDLC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Request permission for notifications
export const requestNotificationPermission = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: "BGMt69a8Jborh3OYLnqJxRLrHph9XBtRDE2zbNMAdHIs8cs-8EYRVQRjHQDCqDESWFwi_I960nzvbj8Y3JvE_lY" });
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



