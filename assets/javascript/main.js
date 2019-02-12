// Initialize FireBase
var config = {
    apiKey: "AIzaSyCTp-6SIBmfIEsMaRxLIGkbqYp48q8BGCQ",
    authDomain: "trainschedulerapp-1ad8b.firebaseapp.com",
    databaseURL: "https://trainschedulerapp-1ad8b.firebaseio.com",
    projectId: "trainschedulerapp-1ad8b",
    storageBucket: "trainschedulerapp-1ad8b.appspot.com",
    messagingSenderId: "228174874798"
  };
  firebase.initializeApp(config);

  // Create our database reference variable
  var database = firebase.database();

  //Create function to add new trains to the list
  $("#add-train").on("click", function(event) {
      
    // Get train inputs
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime = $("#start-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Create a object to temporarily our new train inputs
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: startTime,
        frequency: frequency
    };

    // Put the new train into our database
    database.ref().push(newTrain);

    // Clear input areas
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-time-input").val("");
    $("#frequency-input").val("");

  });

  // Set up our database info to show on the DOM

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var newName = childSnapshot.val().name;
    var newDest = childSnapshot.val().destination;
    var firstTrnTime = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

// Calculate the time fields
    var firstTrainTimeConv = moment(firstTrnTime, "hh:mm a").subtract(1, "years");
    var currentTime = moment().format("HH:mm a");
    var timeDifference = moment().diff(moment(firstTrainTimeConv), "minutes");
    var remainingTime = timeDifference % trainFreq;
    var minsAway = trainFreq - remainingTime;
    var arrival = moment().add(minsAway, "minutes").format("hh:mm a");

// Display our data on the DOM

$("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDest + "</td><td>" + trainFreq + "</td><td>" + arrival + "</td><td>" + minsAway + "</td></tr>");

  });