var player = ~~(Math.random() * 100000);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBocEFG1hxeBFkDwZP587L1APyZino7Ec",
  authDomain: "battletimer-24bb3.firebaseapp.com",
  databaseURL: "https://battletimer-24bb3.firebaseio.com",
  projectId: "battletimer-24bb3",
  storageBucket: "battletimer-24bb3.appspot.com",
  messagingSenderId: "957130983331"
};
firebase.initializeApp(config);
const database = firebase.database();


//----------------------------
function loginButton() {
var provider = new firebase.auth.GoogleAuthProvider();
  firebase
  .auth()
  .signInWithRedirect(provider)
  .then(function() {
    return firebase.auth().getRedirectResult();
  })
  .then(function(result) {
    // This gives you a Google Access Token.
    // You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    database
    .ref()
    .child("/players/" + user + "/Player1/Timer")
    .set(time);
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}


//----------------------------

$(".login").hide();
$("#splash").show();

$("#endGameDiv").hide();
$("#goBack").hide();
$("#OgoBack").hide();
$("#opponentTurn").hide();
$("#yourturn").hide();
$("#accordion").hide();
$("#Oaccordion").hide();
$("#settings").hide();
$("#landing").hide();
$("#aboutThisApp").hide();
$("#returnToLandingButton").hide();
$("#OreturnToLandingButton").hide();

setTimeout(function() {
  $("#landing").fadeIn();
  $("#splash").hide();
}, 1500);

function hideLanding() {
  $("#landing").hide();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();

  $("#endturn").fadeIn();
  $("#overwatch").fadeIn();
  $("#endGame").fadeIn();
  $("#settings").hide();
}

// function loginButton() {
//   $("#landing").hide();

//   $("#settings").hide();
//   $(".login").fadeIn();
// }

function OhideLanding() {
  $("#landing").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();

  $("#Oendturn").fadeIn();
  $("#Ooverwatch").fadeIn();
  $("#OendGame").fadeIn();
  $("#settings").hide();
}

function showSettings() {
  $("#settings").fadeIn();

  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#landing").hide();
}

function aboutThisApp() {
  $("#aboutThisApp").fadeIn();

  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#settings").hide();
  $("#landing").hide();
}

function goToLanding() {
  $("#landing").fadeIn();
  $("#aboutThisApp").hide();
  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").hide();
  $("#settings").hide();
  // $("body").css({
  //   "background-image": 'url("./img/pic.jpg")',
  //   "background-repeat": "no-repeat",
  //   "background-color": "black",
  //   "background-size": "100vw 100vh"
  // });
}

// ACCORDIAN ----------------------------------------------------------------------

$(".accordion").click(function() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this)
      .next()
      .removeClass("show");
  } else {
    $(".accordion").removeClass("active");
    $(".panel").removeClass("show");

    $(this).addClass("active");
    $(this)
      .next()
      .addClass("show");
  }
});

// TIMER ----------------------------------------------------------------------
var chessClock;
var timerOn = false;
var time = 4500;
var customTime = false;

function setGameTime() {
  var userTime = prompt(
    "Please enter new total game round length in minutes",
    "150"
  );

  customTime = true;
  time = (parseInt(userTime) * 60) / 2;
  Otime = (parseInt(userTime) * 60) / 2;

  var minutes = ~~(time / 60);
  var seconds = time - minutes * 60;
  span = document.getElementById("timerCount");
  span.innerHTML = minutes + ":" + seconds;

  var Ominutes = ~~(Otime / 60);
  var Oseconds = Otime - Ominutes * 60;
  span = document.getElementById("OtimerCount");
  span.innerHTML = Ominutes + ":" + Oseconds;

  $("#settings").hide();
  console.log(time);
  console.log(Otime);
  database
    .ref()
    .child("/players/" + player + "/Player1/Timer")
    .set(time);
  database
    .ref()
    .child("/players/" + player + "/Player2/Timer")
    .set(Otime);
}

$("#startTimer").click(function() {
  database
    .ref()
    .child("/players/" + player + "/Player1/Timer")
    .set(time);

  clearInterval(chessClock);
  timerOn = true;
  chessClock = setInterval(function() {
    time--;
    console.log(time);

    if (time >= 0) {
      var minutes = ~~(time / 60);
      var seconds = time - minutes * 60;
      span = document.getElementById("timerCount");
      span.innerHTML = minutes + ":" + seconds;
    }
    if (time === 0) {
      alert("You are out of time.");
      clearInterval(time);
    }
    if ((timerOn = true)) {
      clearInterval(time);
    }
  }, 1000);
});

$("#pause").click(function() {
  console.log("Stopping");
  clearInterval(chessClock);
  database
    .ref()
    .child("/players/" + player + "/Player1/Timer")
    .set(time);
});

// OPPONENT TIMER ----------------------------------------------------------------------
var OchessClock;
var OtimerOn = false;
var Otime = 4500;

$("#OstartTimer").click(function() {
  database
    .ref()
    .child("/players/" + player + "/Player2/Timer")
    .set(Otime);
  clearInterval(OchessClock);
  OtimerOn = true;
  OchessClock = setInterval(function() {
    Otime--;
    console.log(Otime);
    if (Otime >= 0) {
      var Ominutes = ~~(Otime / 60);
      var Oseconds = Otime - Ominutes * 60;
      span = document.getElementById("OtimerCount");
      span.innerHTML = Ominutes + ":" + Oseconds;
    }
    if (Otime === 0) {
      alert("You are out of time.");
      clearInterval(Otime);
    }
    if ((OtimerOn = true)) {
      clearInterval(Otime);
    }
  }, 1000);
});

$("#Opause").click(function() {
  console.log("Opponent Stopping");
  clearInterval(OchessClock);
  database
    .ref()
    .child("/players/" + player + "/Player2/Timer")
    .set(Otime);
});

// preGameInput----------------------------------------------------------------------

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("#myUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

$("#preGameInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".preGameInput").click();
  }
});

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("preGameInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("preGameInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/pregame")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
// movement---------------------------------------------------------------------

var list = document.querySelector("#moveUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function moveElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("movementInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("moveUL").appendChild(li);
  }
  document.getElementById("movementInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/movement")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

$("#movementInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".movementInput").click();
  }
});

// psychicInput ----------------------------------------------------------------

var list = document.querySelector("#psyUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function newPsychicElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("psychicInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("psyUL").appendChild(li);
  }
  document.getElementById("psychicInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/psychic")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

$("#psychicInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".psychicInput").click();
  }
});

// shooting --------------------------------------------------------------------

var list = document.querySelector("#shootUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function shootElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("shootInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("shootUL").appendChild(li);
  }
  document.getElementById("shootInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/shoot")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

$("#shootInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".shootInput").click();
  }
});

// charge ----------------------------------------------------------------------

var list = document.querySelector("#chargeUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function chargeElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("chargeInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("chargeUL").appendChild(li);
  }
  document.getElementById("chargeInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/charge")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

$("#chargeInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".chargeInput").click();
  }
});

// fight ----------------------------------------------------------------------

var list = document.querySelector("#fightUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function fightElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("fightInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("fightUL").appendChild(li);
  }
  document.getElementById("fightInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/fight")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

$("#fightInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".fightInput").click();
  }
});

// morale ----------------------------------------------------------------------

var list = document.querySelector("#moraleUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function moraleElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("moraleInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("moraleUL").appendChild(li);
  }
  document.getElementById("moraleInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player1/morale")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#moraleInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".moraleInput").click();
  }
});
//  counters ---------------------------------

$(".vpCounter").click(function(e) {
  var button_classes;
  var value = +$(".vpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".vpCounter").val(value);
  $("#player1VP").text(value);
});
$(".vpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

$(".cpCounter").click(function(e) {
  var button_classes;
  var value = +$(".cpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".cpCounter").val(value);
});
$(".cpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

//  end turn button ---------------------------------

var count = 1;
var OCount = 1;

$("#endturn").click(function() {
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  count++;
  $("#turncounter").text(count);
  if (count > 1) {
    $(".pregame").hide();
  }
  database
    .ref()
    .child("/players/" + player + "/Player1/Timer")
    .set(time);
  database
    .ref()
    .child("/players/" + player + "/Player1/TurnTime")
    .push(
      "Turn: " + (count - 1) + " " + "Time: " + ((4500 - time) / 60).toFixed(2)
    );
});

$("#Oendturn").click(function() {
  $("#opponentTurn").hide();
  $("#Oaccordion").hide();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  clearInterval(OchessClock);
  console.log("stopping");
  OCount++;
  console.log("enemy turn " + OCount);
  $("#Oturncounter").text(OCount);
  if (OCount > 1) {
    $(".pregame").hide();
  }
  database
    .ref()
    .child("/players/" + player + "/Player2/Timer")
    .set(Otime);
  database
    .ref()
    .child("/players/" + player + "/Player2/TurnTime")
    .push(
      "Turn: " +
        (OCount - 1) +
        " " +
        "Time: " +
        ((4500 - Otime) / 60).toFixed(2)
    );
});

// OVERWATCH button ------------------------------------------------

$("#overwatch").click(function() {
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#opponentTurn").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#goBack").fadeIn();
});

$("#goBack").click(function() {
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  $("#opponentTurn").hide();
  clearInterval(OchessClock);
  console.log("stopping");
  $("#goBack").hide();
});

$("#Ooverwatch").click(function() {
  $("#yourturn").fadeIn();
  $("#opponentTurn").hide();
  $("#Oaccordion").hide();
  clearInterval(OchessClock);
  console.log("Ostopping");
  $("#OgoBack").fadeIn();
});

$("#OgoBack").click(function() {
  $("#yourturn").hide();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#OgoBack").hide();
});

//  OPPONENT counters ---------------------------------

$(".OvpCounter").click(function(e) {
  var button_classes;
  var value = +$(".OvpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".OvpCounter").val(value);
  $("#player2VP").text(value);
});
$(".OvpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

$(".OcpCounter").click(function(e) {
  var button_classes;
  var value = +$(".OcpCounter").val();
  button_classes = $(e.currentTarget).prop("class");
  if (button_classes.indexOf("up_count") !== -1) {
    value = value + 1;
  } else {
    value = value - 1;
  }
  value = value < 0 ? 0 : value;
  $(".OcpCounter").val(value);
});
$(".OcpCounter").click(function() {
  $(this)
    .focus()
    .select();
});

// ------------------------------------------------------------------

// opponent accordians -----------------------------------------------
// opponent preGame---------------------------------------------------------------------

var list = document.querySelector("#OmyUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function OnewElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OpreGameInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OmyUL").appendChild(li);
  }
  document.getElementById("OpreGameInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Pregame")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OpreGameInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OpreGameInput").click();
  }
});

// opponent movement---------------------------------------------------------------------

var list = document.querySelector("#OmoveUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function OmoveElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OmovementInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OmoveUL").appendChild(li);
  }
  document.getElementById("OmovementInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Movement")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OmovementInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OmovementInput").click();
  }
});
// opponent psychicInput ----------------------------------------------------------------

var list = document.querySelector("#OpsyUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function OnewPsychicElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OpsychicInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OpsyUL").appendChild(li);
  }
  document.getElementById("OpsychicInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Psychic")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OpsychicInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OpsychicInput").click();
  }
});
// opponent shooting --------------------------------------------------------------------

var list = document.querySelector("#OshootUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function OshootElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OshootInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OshootUL").appendChild(li);
  }
  document.getElementById("OshootInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Shoot")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OshootInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OshootInput").click();
  }
});
// opponent charge ----------------------------------------------------------------------

var list = document.querySelector("#OchargeUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function OchargeElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OchargeInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OchargeUL").appendChild(li);
  }
  document.getElementById("OchargeInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Charge")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OchargeInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OchargeInput").click();
  }
});
// opponent fight ----------------------------------------------------------------------

var list = document.querySelector("#OfightUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function OfightElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OfightInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OfightUL").appendChild(li);
  }
  document.getElementById("OfightInput").value = "";

  database
    .ref()
    .child("/players/" + player + "/Player2/Fight")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OfightInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OfightInput").click();
  }
});
// opponent morale ----------------------------------------------------------------------

var list = document.querySelector("#OmoraleUL");
list.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

function OmoraleElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("OmoraleInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    document.getElementById("OmoraleUL").appendChild(li);
  }
  document.getElementById("OmoraleInput").value = "";

  database
    .ref()
    .child("/players/Player2" + player + "/Player2/Morale")
    .push(inputValue);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
$("#OmoraleInput").keyup(function(event) {
  if (event.keyCode === 13) {
    $(".OmoraleInput").click();
  }
});
// disable back button, hopefully ----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  document.addEventListener(
    "backbutton",
    function(e) {
      e.preventDefault();
    },
    false
  );
}

// edit list pregame ----------------------------------------------------------------------

function editLists() {
  $("#endGameDiv").hide();
  $("#goBack").hide();
  $("#OgoBack").hide();
  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").fadeIn();
  $("#Oaccordion").hide();
  $("#settings").hide();
  $("#landing").hide();
  $("#aboutThisApp").hide();

  $("#endturn").hide();
  $("#overwatch").hide();
  $("#endGame").hide();

  $("#returnToLandingButton").show();
}

$("#returnToLandingButton").click(function() {
  $("#accordion").hide();
  $("#landing").fadeIn();
  $("#returnToLandingButton").hide();
  // $("body").css({
  //   "background-image": 'url("./img/pic.jpg")',
  //   "background-repeat": "no-repeat",
  //   "background-color": "black",
  //   "background-size": "100vw 100vh"
  // });
});

$("#OreturnToLandingButton").click(function() {
  $("#Oaccordion").hide();
  $("#landing").fadeIn();
  $("#OreturnToLandingButton").hide();
  // $("body").css({
  //   "background-image": 'url("./img/pic.jpg")',
  //   "background-repeat": "no-repeat",
  //   "background-color": "black",
  //   "background-size": "100vw 100vh"
  // });
});

function OeditLists() {
  $("#endGameDiv").hide();
  $("#goBack").hide();
  $("#OgoBack").hide();
  $("#opponentTurn").hide();
  $("#yourturn").hide();
  $("#accordion").hide();
  $("#Oaccordion").fadeIn();
  $("#settings").hide();
  $("#landing").hide();
  $("#aboutThisApp").hide();

  $("#Oendturn").hide();
  $("#Ooverwatch").hide();
  $("#OendGame").hide();

  $("#OreturnToLandingButton").show();
}

// end game button -----------------------------------------

function endGame() {
  if (confirm("Are you sure you want to end the game?") === true) {
    clearInterval(chessClock);
    clearInterval(OchessClock);
    $("#endGameDiv").fadeIn();
    $("#goBack").hide();
    $("#OgoBack").hide();
    $("#opponentTurn").hide();
    $("#yourturn").hide();
    $("#accordion").hide();
    $("#Oaccordion").hide();
    $("#settings").hide();
    $("#landing").hide();
    $("#aboutThisApp").hide();
    if ($("#player1VP").text() > $("#player2VP").text()) {
      $("#winningPlayer").text("You Win!");
    } else if ($("#player1VP").text() == $("#player2VP").text()) {
      $("#winningPlayer").text("Round Draw");
    } else {
      $("#winningPlayer").text("You Lose!");
    }
  }
}

// buttons for resetting game state
$("#keepCurrent").click(function() {
  $("#endGameDiv").hide();
  $("#landing").fadeIn();

  var count = 1;
  var OCount = 1;
  $("#turncounter").text(count);
  $("#Oturncounter").text(OCount);

  $(".OvpCounter").val(0);
  $(".OcpCounter").val(0);

  $(".vpCounter").val(0);
  $(".cpCounter").val(0);

  var newTime = prompt(
    "Please enter new total game round length in minutes",
    "150"
  );
  var newestTime = parseInt(newTime);

  if (newTime != null) {
    time = (newestTime * 60) / 2;
    Otime = (newestTime * 60) / 2;

    var minutes = ~~(time / 60);
    var seconds = time - minutes * 60;
    span = document.getElementById("timerCount");
    span.innerHTML = minutes + ":" + seconds;

    var Ominutes = ~~(Otime / 60);
    var Oseconds = Otime - Ominutes * 60;
    span = document.getElementById("OtimerCount");
    span.innerHTML = Ominutes + ":" + Oseconds;
  }

  $("#settings").hide();
  console.log(time);
  console.log(Otime);

  // $("body").css({
  //   "background-image": 'url("./img/pic.jpg")',
  //   "background-repeat": "no-repeat",
  //   "background-color": "black",
  //   "background-size": "100vw 100vh"
  // });
});

$("#resetGameButton").click(function() {
  if (
    confirm("Resetting will clear all data, do you want to proceed?") === true
  ) {
    location.reload();
  }
});


//---------------------------------------

/**
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]
    function toggleSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    function initApp() {
      // Result from Redirect auth flow.
      // [START getidptoken]
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // [START_EXCLUDE]
          document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END getidptoken]
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
          document.getElementById('quickstart-account-details').textContent = 'null';
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    window.onload = function() {
      initApp();
    };