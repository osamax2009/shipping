// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getToken, getMessaging, onMessage } from 'firebase/messaging'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyDPMpVoGlyDqoATVhbVfl3kCzcr63eWdhw",
  authDomain: "pointdelivery-4cbde.firebaseapp.com",
  projectId: "pointdelivery-4cbde",
  storageBucket: "pointdelivery-4cbde.appspot.com",
  messagingSenderId: "951476526429",
  appId: "1:951476526429:web:bb3915c0896462a6109cb4",
  measurementId: "G-8L6355YGB5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);


export const requestPermission = () => {

    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {

      if (permission === "granted") {

        console.log("Notification User Permission Granted."); 
        return getToken(messaging, { vapidKey: `BAfB5Iqe9vjeWRuP-QnJJYrOfAzS5KFG25hK5ZjtSysdDKatWkObz8sJxKlNRITfhukaHx-UoM9at9pxiCQ7TlE` })
          .then((currentToken) => {

            if (currentToken) {

              console.log('Client Token: ', currentToken);
            } else {
              
              console.log('Failed to generate the app registration token.');
            }
          })
          .catch((err) => {

            console.log('An error occurred when requesting to receive the token.', err);
          });
      } else {

        console.log("User Permission Denied.");
      }
    });

  }

requestPermission();


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});