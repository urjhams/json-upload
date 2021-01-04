//const firebase = require("firebase");
// Required for side-effects
//require("firebase/storage");

//// Initialize Cloud Firestore through Firebase
//firebase.initializeApp({
//apiKey: "AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ",
//authDomain: "json-upload-12aa7.firebaseapp.com",
//projectId: "json-upload-12aa7"
//});

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

//var firebaseConfig = {
//    apiKey: 'AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ',
//    authDomain: 'json-upload-12aa7.firebaseapp.com',
//    databaseURL: 'https://json-upload-12aa7-default-rtdb.europe-west1.firebasedatabase.app',
//    storageBucket: 'gs://json-upload-12aa7.appspot.com'
//};
//
//firebase.initializeApp(firebaseConfig);
//
//var storage = firebase.storage();
//
//var storageRef = storage.ref();
//
//var fileRef = storageRef.child('./test.zip');
//
//var file = '';
//
//fileRef.put(file).then(function(snapshot) {
//    console.log("uploaded a file");
//});

const {Storage} = require('@google-cloud/storage');
const express = require("express");

const app = new express();


const storage = new Storage({
    keyFilename: 'AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ',
 });

let bucketName = 'gs://json-upload-12aa7.appspot.com'

let filename = './json-upload/test.zip';

// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();
