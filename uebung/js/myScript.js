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
var acrePriceBuy;
var acrePriceSell;
var confirmFood;
var confirmSowing;
var confirmBuyAcre;
var confirmSellAcre;
// ----------------------------------------
// Events
window.onload = setupGame;
// Input Fields
inputfieldFood.addEventListener("keyup", foodBeforeAfter);
inputfieldFood.addEventListener("click", foodBeforeAfter);
inputfieldSowing.addEventListener("keyup", sowingBeforeAfter);
inputfieldSowing.addEventListener("click", sowingBeforeAfter);
// inputfieldAcreBuy.addEventListener("keyup", );
// inputfieldAcreSell.addEventListener("keyup", );

// Buttons
buttonFood.addEventListener("click", giveFoodToCitizen);
// buttonSowing.addEventListener("click", );
// buttonAcreBuy.addEventListener("click", );
// buttonAcreSell.addEventListener("click", );
// buttonNextRound.addEventListener("click", );

// pressed on Tab
tabFood.addEventListener("click", foodSetStandardValues);
tabSowing.addEventListener("click", SowingSetStandardValues);
// ----------------------------------------
// Functions

// Setup
function setupGame() {
  year = 1;
  grains = 6000;
  citizens = 100;
  acres = 400;
  document.getElementById("year").innerHTML = year;
  document.getElementById("grain").innerHTML = grains;
  document.getElementById("citizen").innerHTML = citizens;
  document.getElementById("acre").innerHTML = acres;

  var confirmFood = false;
  var confirmSowing = false;
  var confirmBuyAcre = false;
  var confirmSellAcre = false;
}

// ----------------------------------------
// Food Allocation
function foodSetStandardValues() {
  if (!confirmFood) {
    // to stay even in citizens, when enough grains is available
    if (citizens * 40 <= grains) {
      document.getElementById("inputfieldFood").value = citizens * 40;
    }
    // half the grains abailable
    else {
      document.getElementById("inputfieldFood").value = citizens * Math.floor(grains / 2);
    }
    // call function to update visual
    foodBeforeAfter();
  }
}

function foodBeforeAfter() {
  // input
  let inputOfGrains = document.getElementById("inputfieldFood").value;
  // Text
  let sAfterGrain = (document.getElementById("grain").innerHTML - document.getElementById("inputfieldFood").value) + " grains";
  let sAfterCitizen = document.getElementById("citizen").innerHTML + " citizen";

  // Before Text
  $("#food .beforeGrains").html(document.getElementById("grain").innerHTML + " grains");
  $("#food .beforeCitizen").html(document.getElementById("citizen").innerHTML + " citizen");

  // remove before selector
  $("#food .afterCitizen").removeClass("plus");
  $("#food .afterCitizen").removeClass("minus");
  $("#food .afterGrains").removeClass("minus");

  // not enough corn
  if (inputOfGrains > grains) {
    sAfterGrain = "not enough corn";
    sAfterCitizen = "";
  }
  // negative amount of corn
  else if (inputOfGrains < 0){
    sAfterGrain = "enter a positive number";
    sAfterCitizen = "";
  }
  // 40 corn per citizen
  else {
    let stayCitizen = Math.floor(inputOfGrains / 40);
    sAfterCitizen = stayCitizen + " citizen";
    // increase in citizen
    if (stayCitizen > citizens) {
      $("#food .afterCitizen").addClass("plus");
    } 
    // decrease in citizen
    else if (stayCitizen < citizens) {
      $("#food .afterCitizen").addClass("minus");
    }
  }

  if (inputOfGrains > 0) {
    $("#food .afterGrains").addClass("minus");
  }

  // After
  $("#food .afterGrains").html(sAfterGrain);
  $("#food .afterCitizen").html(sAfterCitizen);

}

function giveFoodToCitizen() {
  // input
  let inputOfGrains = document.getElementById("inputfieldFood").value;

  if (inputOfGrains >= 0 && inputOfGrains <= grains) {
    document.getElementById("grain").innerHTML = grains - inputOfGrains;
    document.getElementById("citizen").innerHTML = Math.floor(inputOfGrains / 40);
  }

  // disables input
  $("#inputfieldFood").prop("disabled", true);
  $("#buttonFood").prop("disabled", true);
  $("#buttonFood").removeClass("active");
  $("#buttonFood").removeClass("hover");

  // set confirm to true
  confirmFood = true;
}



// ----------------------------------------
// Sowing
// 2 corn -> 1 acre | 1 citizen -> 10 acre
function SowingSetStandardValues() {
  if (!confirmFood) {
    // maximun sowing, when possible
    let maxFieldToFarm = citizens * 10;
    // enough acres and grain is available
    if (maxFieldToFarm >= acres && (acres*2) <= grains) { 
      document.getElementById("inputfieldSowing").value = maxFieldToFarm;
    }
    // default
    else {
      document.getElementById("inputfieldSowing").value = 0;
    }

    // call function to update visual
    sowingBeforeAfter();

    console.log(maxFieldToFarm);
    console.log(acres);
  }
}

function sowingBeforeAfter() {
  // input
  let inputOfSowing = document.getElementById("inputfieldSowing").value;
  // Text
  let sAfterGrain = (document.getElementById("grain").innerHTML - document.getElementById("inputfieldSowing").value) + " grains";

  // Before Text
  $("#sowing .beforeGrains").html(document.getElementById("grain").innerHTML + " grains");

  // remove before selector
  $("#sowing .afterGrains").removeClass("minus");
  $("#sowing .changeOfGrains").removeClass("plus");

  // not enough corn
  if (inputOfSowing > grains) {
    sAfterGrain = "not enough corn";
  }
  else if (inputOfSowing < 0) {
    sAfterGrain = "enter a positive number";
  }
  // not enough citizen
  else if (inputOfSowing > citizens * 10) {
    sAfterGrain = "not enough citizen";
    $("#sowing .changeOfGrains").html("0 - 0 corn");
  }
  // not enough acre
  else if (inputOfSowing > acres * 2) {
    sAfterGrain = "not enough acre";
    $("#sowing .changeOfGrains").html("0 - 0 corn");
  }
  else {
    if (inputOfSowing > 1) {
      // needs 2 corn for 1 acre -> rounds down if number is odd
      if (inputOfSowing % 2 != 0) {
        inputOfSowing--;
      }
      $("#sowing .afterGrains").addClass("minus");


      let sMinYield = inputOfSowing * 1;
      let sMaxYield = inputOfSowing * 10;
      $("#sowing .changeOfGrains").html(sMinYield + " - " + sMaxYield + " corn");
      $("#sowing .changeOfGrains").addClass("plus");
    }
    else {
      $("#sowing .changeOfGrains").html("0 - 0 corn");
    }
  }

  // After
  $("#sowing .afterGrains").html(sAfterGrain);

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