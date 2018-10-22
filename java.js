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
  $("#splash").fadeOut();
}, 1500);

function hideLanding() {
  $("#landing").fadeOut();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  $("body").css("background", "#222222");
  $("#endturn").fadeIn();
  $("#overwatch").fadeIn();
  $("#endGame").fadeIn();
}

function OhideLanding() {
  $("#landing").fadeOut();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  $("body").css("background", "#222222");
  $("#Oendturn").fadeIn();
  $("#Ooverwatch").fadeIn();
  $("#OendGame").fadeIn();
}

function showSettings() {
  $("#settings").fadeIn();
}

function aboutThisApp() {
  $("#aboutThisApp").fadeIn();

  $("#opponentTurn").fadeOut();
  $("#yourturn").fadeOut();
  $("#accordion").fadeOut();
  $("#Oaccordion").fadeOut();
  $("#settings").fadeOut();
  $("#landing").fadeOut();
}

function goToLanding() {
  $("#landing").fadeIn();
  $("#aboutThisApp").fadeOut();
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
  customTime = true;
  time = ($("#timeMMMM").val() * 60) / 2;
  Otime = ($("#timeMMMM").val() * 60) / 2;

  var minutes = ~~(time / 60);
  var seconds = time - minutes * 60;
  span = document.getElementById("timerCount");
  span.innerHTML = minutes + ":" + seconds;

  var Ominutes = ~~(Otime / 60);
  var Oseconds = Otime - Ominutes * 60;
  span = document.getElementById("OtimerCount");
  span.innerHTML = Ominutes + ":" + Oseconds;

  $("#settings").fadeOut();
  console.log(time);
  console.log(Otime);
}

$("#startTimer").click(function() {
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
});

// OPPONENT TIMER ----------------------------------------------------------------------
var OchessClock;
var OtimerOn = false;
var Otime = 4500;

$("#OstartTimer").click(function() {
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

// $("#Oreset").click(function() {
//   clearInterval(OchessClock);
//   Otime = 5400;
//   span = document.getElementById("OtimerCount");
//   span.innerHTML = "90:00";
//   console.log("Opponet Reset");
// });

$("#Opause").click(function() {
  console.log("Opponent Stopping");
  clearInterval(OchessClock);
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
  $("#yourturn").fadeOut();
  $("#accordion").fadeOut();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  count++;
  $("#turncounter").text(count);
  if (count > 1) {
    $(".pregame").fadeOut();
  }
});

$("#Oendturn").click(function() {
  $("#opponentTurn").fadeOut();
  $("#Oaccordion").fadeOut();
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  clearInterval(OchessClock);
  console.log("stopping");
  OCount++;
  console.log("enemy turn " + OCount);
  $("#Oturncounter").text(OCount);
  if (OCount > 1) {
    $(".pregame").fadeOut();
  }
});

// OVERWATCH button ------------------------------------------------

$("#overwatch").click(function() {
  $("#yourturn").fadeOut();
  $("#accordion").fadeOut();
  $("#opponentTurn").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#goBack").fadeIn();
});

$("#goBack").click(function() {
  $("#yourturn").fadeIn();
  $("#accordion").fadeIn();
  $("#opponentTurn").fadeOut();
  clearInterval(OchessClock);
  console.log("stopping");
  $("#goBack").fadeOut();
});

$("#Ooverwatch").click(function() {
  $("#yourturn").fadeIn();
  $("#opponentTurn").fadeOut();
  $("#Oaccordion").fadeOut();
  clearInterval(OchessClock);
  console.log("Ostopping");
  $("#OgoBack").fadeIn();
});

$("#OgoBack").click(function() {
  $("#yourturn").fadeOut();
  $("#opponentTurn").fadeIn();
  $("#Oaccordion").fadeIn();
  clearInterval(chessClock);
  console.log("stopping");
  $("#OgoBack").fadeOut();
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

  $("#returnToLandingButton").show()

}


$("#returnToLandingButton").click(function() {
  $("#accordion").fadeOut();
  $("#landing").fadeIn();
  $("#returnToLandingButton").hide()
});

$("#OreturnToLandingButton").click(function() {
  $("#Oaccordion").fadeOut();
  $("#landing").fadeIn();
  $("#OreturnToLandingButton").hide()
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

  $("#OreturnToLandingButton").show()
}

// end game button -----------------------------------------

function endGame() {
  if (confirm("Are you sure you want to end the game?") === true) {
    $("#endGameDiv").fadeIn();
    $("#goBack").fadeOut();
    $("#OgoBack").fadeOut();
    $("#opponentTurn").fadeOut();
    $("#yourturn").fadeOut();
    $("#accordion").fadeOut();
    $("#Oaccordion").fadeOut();
    $("#settings").fadeOut();
    $("#landing").fadeOut();
    $("#aboutThisApp").fadeOut();
    if ($("#player1VP").text() > $("#player2VP").text()) {
      $("#winningPlayer").text("You Win!");
    } else if ($("#player1VP").text() == $("#player2VP").text()) {
      $("#winningPlayer").text("Round Draw");
    } else {
      $("#winningPlayer").text("You Lose!");
    }
  }
}

$("#resetGameButton").click(function() {
  location.reload();
});
