 const firebase = require("firebase");
 // Required for side-effects
 require("firebase/firestore");

 function loadJSON(filePath) {
     var xobj = new XMLHttpRequest();
     xobj.overrideMimeType("application/json");
     xobj.open('GET', filePath, true);
     xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
             return JSON.parse(xobj.responseText)
         }
     };
     xobj.send(null);
 }

 // Initialize Cloud Firestore through Firebase
 firebase.initializeApp({
     apiKey: "AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ",
     authDomain: "json-upload-12aa7.firebaseapp.com",
     projectId: "json-upload-12aa7"
 });

 var db = firebase.firestore();

 var json = loadJSON('usb_conversion_tables.json');

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
