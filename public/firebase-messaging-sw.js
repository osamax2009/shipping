import "./js/firebase-app-compat"

import "./js/firebase-messaging-compat"

//the Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyDPMpVoGlyDqoATVhbVfl3kCzcr63eWdhw",
    authDomain: "pointdelivery-4cbde.firebaseapp.com",
    projectId: "pointdelivery-4cbde",
    storageBucket: "pointdelivery-4cbde.appspot.com",
    messagingSenderId: "951476526429",
    appId: "1:951476526429:web:bb3915c0896462a6109cb4",
    measurementId: "G-8L6355YGB5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});