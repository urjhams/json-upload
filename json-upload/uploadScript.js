const firebase = require("firebase");

const fs = require('fs');

 Initialize Cloud Firestore through Firebase
firebase.initializeApp({
apiKey: "AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ",
authDomain: "json-upload-12aa7.firebaseapp.com",
projectId: "json-upload-12aa7"
});

var db = firebase.firestore();

var json = require('./usb_conversion_tables.json');

var jsonString = JSON.stringify(json);

db.collection("firmware").doc("current").set({
    json: jsonString,
    time: new Date().getTime()
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
