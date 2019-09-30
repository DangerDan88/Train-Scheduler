$(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyBBpAssZZODfjKJjV6Le3QyLAhXcwI2Hnw",
        authDomain: "dan-train.firebaseapp.com",
        databaseURL: "https://dan-train.firebaseio.com",
        projectId: "dan-train",
        storageBucket: "",
        messagingSenderId: "1081380486863",
        appId: "1:1081380486863:web:6daf268e368981f59881ba"
    };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    $("#add-train-btn").on('click', function () {
        event.preventDefault();
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#place-input").val().trim();
        var frequency = $("#time-input").val().trim();
        var startTime = $("#start-input").val().trim();
        console.log(trainName);
        console.log(destination);
        console.log(frequency);
        console.log(startTime);
        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            startTime: startTime
        })



    })

 database.ref().on("child_added", function (snapshot) {
 var sv = snapshot.val();

$("<tbody>").append("<tr>").append($("<td>").text(sv.trainName));


console.log(snapshot.val());





    })
})

