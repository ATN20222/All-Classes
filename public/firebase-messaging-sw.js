// Import Firebase scripts required for messaging.
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js');

// Your Firebase configuration (use the same config as your app).
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
