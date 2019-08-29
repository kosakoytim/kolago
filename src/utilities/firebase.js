import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBR6cVK76KadTZMtB6gnNC-Xzqdlh8YrTw",
  authDomain: "kolago-96569.firebaseapp.com",
  databaseURL: "https://kolago-96569.firebaseio.com",
  projectId: "kolago-96569",
  storageBucket: "kolago-96569.appspot.com",
  messagingSenderId: "205678751952"
};
firebase.initializeApp(config);

export const database = firebase.firestore();
export const authentication = firebase.auth();
