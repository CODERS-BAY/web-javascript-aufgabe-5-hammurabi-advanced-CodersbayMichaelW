// Input Fields
var inputfieldFood = document.getElementById("inputfieldFood");
var inputfieldSowing = document.getElementById("inputfieldSowing");
var inputfieldAcreBuy = document.getElementById("inputfieldAcreBuy");
var inputfieldAcreSell = document.getElementById("inputfieldAcreSell");
// Buttons
var buttonFood = document.getElementById("buttonFood");
var buttonSowing = document.getElementById("buttonSowing");
var buttonAcreBuy = document.getElementById("buttonBuyAcre");
var buttonAcreSell = document.getElementById("buttonSellAcre");
var buttonNextRound = document.getElementById("buttonNextRound");
// Variables
var year;
var grains;
var citizens;
var acres;
var acrePrice;

function setupGame() {
    year = 1;
    grains = 6000;
    citizens = 100;
    acres = 400;
    document.getElementById("year").innerHTML = year;
    document.getElementById("grain").innerHTML = grains;
    document.getElementById("citizen").innerHTML = citizens;
    document.getElementById("acre").innerHTML = acres;
}



















// regulates the tabs
function openInput(event, option) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(option).style.display = "block";
    event.currentTarget.className += " active";
}

window.onload = setupGame;
// Input Fields
inputfieldFood.addEventListener("keyup", );
inputfieldSowing.addEventListener("keyup", );
inputfieldAcreBuy.addEventListener("keyup", );
inputfieldAcreSell.addEventListener("keyup", );
// Buttons
buttonFood.addEventListener("click", );
buttonSowing.addEventListener("click", );
buttonAcreBuy.addEventListener("click", );
buttonAcreSell.addEventListener("click", );
buttonNextRound.addEventListener("click", );