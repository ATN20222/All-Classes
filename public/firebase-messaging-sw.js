// Import Firebase scripts required for messaging.
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js');

// Your Firebase configuration (use the same config as your app).
const firebaseConfig = {
    apiKey: "AIzaSyCuOTbxvFca1wSVTBh3tpuyRujGgd4JAsI",
    authDomain: "all-classes-497cb.firebaseapp.com",
    projectId: "all-classes-497cb",
    storageBucket: "all-classes-497cb.firebasestorage.app",
    messagingSenderId: "356000361810",
    appId: "1:356000361810:web:e61caf9234726144d95e8b",
    measurementId: "G-H08FW0YDLC"
};  
// Initialize Firebase app in the Service Worker.
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging.
const messaging = firebase.messaging();

// Handle background messages.
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

