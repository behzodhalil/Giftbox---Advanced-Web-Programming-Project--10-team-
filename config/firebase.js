import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyBaZ3ZxQJZ5S67t83Y3RX-qM2mJvwTwjDg",
  authDomain: "homepage-6d132.firebaseapp.com",
  projectId: "homepage-6d132",
  storageBucket: "homepage-6d132.appspot.com",
  messagingSenderId: "547630964022",
  appId: "1:547630964022:web:8a79c6101b666200466797"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
console.log(app.name ? "Firebase Mode Activated!" : "Firebase not working :(");
