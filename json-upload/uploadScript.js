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

// in node js, should not use relative file path (./), use __dirname instead.
const filePath = __dirname + '/test.zip';

fs.readFile(filePath, (error, data) => {
    if (error) {
        console.log(`there is an error when reading file`);
    }

    const blob = Buffer.from(data);

    fileRef.put(blob).then(function(snapshot) {
        console.log("uploaded blob");
    });
});

//fs.readFile(filePath, {encoding: 'base64'}, (err, data) => {
//    if (err) {
//        console.log(`there is an error when reading file`);
//    }
//    fileRef.putString(data, 'base64').then(function(snapshot) {
//        console.log("uploaded base 64 string");
//    });
//});

//const fileBuffer = fs.readFileSync(filePath);
//
//const base64 = fileBuffer.toString('base64');
//console.log(base64);
//
//fileRef.putString(base64, 'base64').then(function(snapshot) {
//    console.log("uploaded base 64 string");
//});
