 const firebase = require("firebase");
 // Required for side-effects
 require("firebase/firestore");

 // Initialize Cloud Firestore through Firebase
 firebase.initializeApp({
     apiKey: "AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ",
     authDomain: "json-upload-12aa7.firebaseapp.com",
     projectId: "json-upload-12aa7"
 });

 var db = firebase.firestore();

 var json = require('./usb_conversion_tables.json');

 json.forEach(function (obj) {
     db.collection("menu").add({
         id: obj.id,
         name: obj.name,
         description: obj.description,
         price: obj.price,
         type: obj.type
     }).then(function (docRef) {
         console.log("Document written with ID: ", docRef.id);
     })
         .catch(function (error) {
             console.error("Error adding document: ", error);
         });
 });
