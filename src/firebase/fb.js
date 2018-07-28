var firebase = require('firebase');
require('dotenv').config()

var config = {
    apiKey: process.env.apiKey,
    authDomain: "kanban-45fd1.firebaseapp.com",
    databaseURL: "https://kanban-45fd1.firebaseio.com",
    projectId: "kanban-45fd1",
    storageBucket: "kanban-45fd1.appspot.com",
    messagingSenderId: "201903545029"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  export default database

  