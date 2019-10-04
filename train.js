$(function () {
        // firebase config key to get connected
    var firebaseConfig = {
        apiKey: "AIzaSyBBpAssZZODfjKJjV6Le3QyLAhXcwI2Hnw",
        authDomain: "dan-train.firebaseapp.com",
        databaseURL: "https://dan-train.firebaseio.com",
        projectId: "dan-train",
        storageBucket: "",
        messagingSenderId: "1081380486863",
        appId: "1:1081380486863:web:6daf268e368981f59881ba"
    };
    // initializes fire base
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var startTime = 0;

    $("#add-train-btn").on('click', function () {
        event.preventDefault();
        trainName = $("#train-name-input").val().trim();
        destination = $("#place-input").val().trim();
        frequency = $("#time-input").val().trim();
        startTime = $("#start-input").val().trim();


            // saved this data as an object to easily push to firebase.
        var newTrain = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: startTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#place-input").val("");
        $("#time-input").val("");
        $("#start-input").val("");


    })

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
            // this catches user input to firbase and is used in these variables.
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var startTime = childSnapshot.val().startTime;
        var frequency = childSnapshot.val().frequency;


        


        var firstTime = startTime;

            // start back in time so you get a positive number back for minutes away
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

            // this gets current time.
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log(diffTime);
        var remainder = diffTime % parseInt(frequency);
        console.log(remainder);

        var minutesToTrain = frequency - remainder;
        var nextTrain = moment().add(minutesToTrain, "minutes");

        var nextTrain = moment().add(minutesToTrain, "minutes");
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +
            "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesToTrain + "</td></tr>");

       

    })
})

