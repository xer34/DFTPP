
$("#opponentTurn").hide();
$("#yourturn").hide();
$("#accordion").hide();
$("#Oaccordion").hide();
$("#settings").hide();

function hideLanding() {
  $("#landing").hide();
  $("#yourturn").show();
  $("#accordion").show();
  $("body").css("background", "#222222");
}

function OhideLanding() {
  $("#landing").hide();
  $("#opponentTurn").show();
  $("#Oaccordion").show();
  $("body").css("background", "#222222");
}

function showSettings() {
  $("#settings").show();
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
var time = 5400;
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

  $("#settings").hide();
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

// $("#reset").click(function() {
//   clearInterval(chessClock);
//   time = 5400;
//   span = document.getElementById("timerCount");
//   span.innerHTML = "90:00";
//   console.log("Reset");
// });

$("#pause").click(function() {
  console.log("Stopping");
  clearInterval(chessClock);
});

// OPPONENT TIMER ----------------------------------------------------------------------
var OchessClock;
var OtimerOn = false;
var Otime = 5400;

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
  $("#opponentTurn").show();
  $("#Oaccordion").show();
  clearInterval(chessClock);
  console.log("stopping");
  count++;
  $("#turncounter").text(count);
  if (count > 1) {
    $(".pregame").hide();
  }
});

$("#Oendturn").click(function() {
  $("#opponentTurn").hide();
  $("#Oaccordion").hide();
  $("#yourturn").show();
  $("#accordion").show();
  clearInterval(OchessClock);
  console.log("stopping");
  OCount++;
  console.log("enemy turn " + OCount);
  $("#Oturncounter").text(OCount);
  if (OCount > 1) {
    $(".pregame").hide();
  }
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

