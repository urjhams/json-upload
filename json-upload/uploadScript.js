const firebase = require("firebase");
// Required for side-effects
require("firebase/storage");

const fs = require('fs');

// Initialize Cloud Firestore through Firebase
//firebase.initializeApp({
//apiKey: "AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ",
//authDomain: "json-upload-12aa7.firebaseapp.com",
//projectId: "json-upload-12aa7"
//});
//
//var db = firebase.firestore();
//
//var json = require('./usb_conversion_tables.json');
//
//var jsonString = JSON.stringify(json);
//
//db.collection("firmware").doc("current").set({
//    json: jsonString,
//    time: new Date().getTime()
//})
//.then(function() {
//    console.log("Document successfully written!");
//})
//.catch(function(error) {
//    console.error("Error adding document: ", error);
//});

var firebaseConfig = {
    apiKey: 'AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ',
    authDomain: 'json-upload-12aa7.firebaseapp.com',
    databaseURL: 'https://json-upload-12aa7-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'gs://json-upload-12aa7.appspot.com'
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

var storageRef = storage.ref();

var fileRef = storageRef.child('./test.zip');

fs.readFile('./test.zip', function read(error, data) {
    if (error) {
        console.log("failed to read file's data");
    }
    const content = data;

//    var base64 = Buffer.from(content).toString('base64');

    fileRef.putString(content/*base64, 'base64'*/).then(function(snapshot) {
        console.log("uploaded base 64 string");
    });
});
