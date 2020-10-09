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
var fieldYield;
// ----------------------------------------
// Events
window.onload = setupGame;
// Input Fields
inputfieldFood.addEventListener("keyup", foodBeforeAfter);
inputfieldFood.addEventListener("click", foodBeforeAfter);
inputfieldSowing.addEventListener("keyup", sowingBeforeAfter);
inputfieldSowing.addEventListener("click", sowingBeforeAfter);
inputfieldAcreSell.addEventListener("keyup", sellAcreBeforeAfter);
inputfieldAcreSell.addEventListener("click", sellAcreBeforeAfter);
inputfieldAcreBuy.addEventListener("keyup", buyAcreBeforeAfter);
inputfieldAcreBuy.addEventListener("click", buyAcreBeforeAfter);

// Buttons
buttonFood.addEventListener("click", giveFoodToCitizen);
buttonSowing.addEventListener("click", doSowing);
buttonSellAcre.addEventListener("click", sellAcre);
buttonBuyAcre.addEventListener("click", buyAcre);
buttonNextRound.addEventListener("click", nextRoundButtonPressed);

// pressed on Tab
tabFood.addEventListener("click", foodSetStandardValues);
tabSowing.addEventListener("click", SowingSetStandardValues);
tabSellAcre.addEventListener("click", sellAcreStandardValues);
tabBuyAcre.addEventListener("click", buyAcreStandardValues);
tabNextRound.addEventListener("click", updatesVisualConfirmes);
// ----------------------------------------
// Functions

// Setup
function setupGame() {
  year = 1;
  grains = 6000;
  citizens = 100;
  acres = 400;
  
  setUpRound();
}

function setUpRound() {
  calcAcrePrice();

  document.getElementById("year").innerHTML = year;
  document.getElementById("grain").innerHTML = grains;
  document.getElementById("citizen").innerHTML = citizens;
  document.getElementById("acre").innerHTML = acres;
  document.getElementById("acreSellPrice").innerHTML = acrePriceSell;
  document.getElementById("acreBuyPrice").innerHTML = acrePriceBuy;

  confirmFood = false;
  confirmSowing = false;
  confirmBuyAcre = false;
  confirmSellAcre = false;
}

function calcAcrePrice() {
  acrePriceSell = Math.floor(Math.random() * 20) + year; // 1 -10
  // acrePrice should be higher than sell price
  // Math.floor(Math.random() * (max - min) ) + min;
  acrePriceBuy = Math.floor(Math.random() * ((20 + year) - acrePriceSell)) + acrePriceSell;
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

// ----------------------------------------
// Food Allocation
function foodSetStandardValues() {
  if (!confirmFood) {
    // to stay even in citizens, when enough grains is available
    (citizens * 40 <= grains) ? document.getElementById("inputfieldFood").value = citizens * 40
                              : document.getElementById("inputfieldFood").value = citizens * Math.floor(grains / 2);
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
    sAfterGrain = "not enough grains";
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

  // update values
  if (inputOfGrains >= 0 && inputOfGrains <= grains) {
    grains -= inputOfGrains;
    citizens = Math.floor(inputOfGrains / 40);
    document.getElementById("grain").innerHTML = grains;
    document.getElementById("citizen").innerHTML = citizens;

    // disables input
    $("#inputfieldFood").prop("disabled", true);
    $("#buttonFood").prop("disabled", true);
    $("#buttonFood").removeClass("active");
    $("#buttonFood").removeClass("hover");

    // set confirm to true
    confirmFood = true;
  }
}


// ----------------------------------------
// Sowing
// 2 corn -> 1 acre | 1 citizen -> 10 acre
function SowingSetStandardValues() {
  if (!confirmSowing) {
    // maximun sowing, when possible
    let maxFieldToFarm = Math.min(citizens * 10, acres * 2); // good guess

    // enough citizens and grain is available
    (maxFieldToFarm <= citizens * 10 && (acres*2) <= grains) ? document.getElementById("inputfieldSowing").value = maxFieldToFarm
                                                     : document.getElementById("inputfieldSowing").value = 0;

    // call function to update visual
    sowingBeforeAfter();
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
    sAfterGrain = "not enough grains";
    $("#sowing .changeOfGrains").html("0 - 0 grains");
  }
  else if (inputOfSowing < 0) {
    sAfterGrain = "enter a positive number";
    $("#sowing .changeOfGrains").html("0 - 0 grains");
  }
  // not enough citizen
  else if (inputOfSowing > citizens * 10) {
    sAfterGrain = "not enough citizen";
    $("#sowing .changeOfGrains").html("0 - 0 grains");
  }
  // not enough acre
  else if (inputOfSowing > acres * 2) {
    sAfterGrain = "not enough acre";
    $("#sowing .changeOfGrains").html("0 - 0 grains");
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
      $("#sowing .changeOfGrains").html(sMinYield + " - " + sMaxYield + " grains");
      $("#sowing .changeOfGrains").addClass("plus");
    }
    else {
      $("#sowing .changeOfGrains").html("0 - 0 grains");
    }
  }

  // After
  $("#sowing .afterGrains").html(sAfterGrain);

}

function doSowing() {
  // input
  let inputOfSowing = document.getElementById("inputfieldSowing").value;

  // update values | the field yield is updated when the Next Round Button is pressed
  if (inputOfSowing >= 0 && inputOfSowing <= grains && inputOfSowing <= acres * 2 && inputOfSowing <= citizens * 10) {
    grains -= inputOfSowing;
    document.getElementById("grain").innerHTML = grains;

    // needs 2 corn for 1 acre -> rounds down if number is odd
    if (inputOfSowing % 2 != 0) {
      inputOfSowing--;
    }
    fieldYield = Number(Math.floor(Math.random() * (9 * inputOfSowing)) + Number(inputOfSowing));

    // disables input
    $("#inputfieldSowing").prop("disabled", true);
    $("#buttonSowing").prop("disabled", true);
    $("#buttonSowing").removeClass("active");
    $("#buttonSowing").removeClass("hover");

    // set confirm to true
    confirmSowing = true;
  }
}



// ----------------------------------------
// Sell Acre
function sellAcreStandardValues() {
  if (!confirmSellAcre) {
    document.getElementById("inputfieldAcreSell").value = 0;

    sellAcreBeforeAfter();
  }
}

function sellAcreBeforeAfter() {
  // input
  let inputOfSellAcre = document.getElementById("inputfieldAcreSell").value;
  let textGrain;
  let textAcre;

  // Before Text
  $("#acreSell .beforeGrains").html(grains + " grains");
  $("#acreSell .beforeAcres").html(acres + " acres");

  // remove before selector
  $("#acreSell .afterGrains").removeClass("plus");
  $("#acreSell .afterAcres").removeClass("minus");

  // After Text
  if (inputOfSellAcre > acres) {
    textGrain = "not enough acre";
    textAcre = "";
  }
  else if (inputOfSellAcre < 0) {
    textGrain = "enter a positive number";
    textAcre = "";
  }
  else {
    textGrain = (grains + (acrePriceSell * inputOfSellAcre)) + " grains";
    textAcre = (acres - inputOfSellAcre) + " acres";
    if (inputOfSellAcre != 0) {
      $("#acreSell .afterGrains").addClass("plus");
      $("#acreSell .afterAcres").addClass("minus");
    }
  }

  $("#acreSell .afterGrains").html(textGrain);
  $("#acreSell .afterAcres").html(textAcre);
}

function sellAcre() {
  let inputOfSellAcre = document.getElementById("inputfieldAcreSell").value;

  // update values
  if (inputOfSellAcre >= 0 && inputOfSellAcre <= acres) {
    grains += (inputOfSellAcre * acrePriceSell);
    acres -= inputOfSellAcre;

    document.getElementById("grain").innerHTML = grains;
    document.getElementById("acre").innerHTML = acres;

    // disables input
    $("#inputfieldAcreSell").prop("disabled", true);
    $("#buttonSellAcre").prop("disabled", true);
    $("#buttonSellAcre").removeClass("active");
    $("#buttonSellAcre").removeClass("hover");

    // set confirm to true
    confirmSellAcre = true;
  }
}

// ----------------------------------------
// Buy Acre
function buyAcreStandardValues() {
  if (!confirmBuyAcre) {
    document.getElementById("inputfieldAcreBuy").value = 0;

    buyAcreBeforeAfter();
  }
}

function buyAcreBeforeAfter() {
  let inputOfBuyAcre = Number(document.getElementById("inputfieldAcreBuy").value);
  let textGrain;
  let textAcre;

  // Before Text
  $("#acreBuy .beforeGrains").html(grains + " grains");
  $("#acreBuy .beforeAcres").html(acres + " acres");

  // remove before selector
  $("#acreBuy .afterGrains").removeClass("minus");
  $("#acreBuy .afterAcres").removeClass("plus");

    // After Text
    if ((inputOfBuyAcre * acrePriceBuy) > grains) {
      textGrain = "not enough grains";
      textAcre = "";
    }
    else if (inputOfBuyAcre < 0) {
      textGrain = "enter a positive number";
      textAcre = "";
    }
    else {
      textGrain = (grains - (acrePriceBuy * inputOfBuyAcre)) + " grains";
      textAcre = (acres + inputOfBuyAcre) + " acres";
      if (inputOfBuyAcre != 0) {
        $("#acreBuy .afterGrains").addClass("minus");
        $("#acreBuy .afterAcres").addClass("plus");
      }
    }
  
    $("#acreBuy .afterGrains").html(textGrain);
    $("#acreBuy .afterAcres").html(textAcre);
}

function buyAcre() {
  let inputOfBuyAcre = Number(document.getElementById("inputfieldAcreBuy").value);

  // update values
  if (inputOfBuyAcre >= 0 && inputOfBuyAcre * acrePriceBuy <= grains) {
    grains -= (inputOfBuyAcre * acrePriceBuy);
    acres += inputOfBuyAcre;

    document.getElementById("grain").innerHTML = grains;
    document.getElementById("acre").innerHTML = acres;

    // disables input
    $("#inputfieldAcreBuy").prop("disabled", true);
    $("#buttonBuyAcre").prop("disabled", true);
    $("#buttonBuyAcre").removeClass("active");
    $("#buttonBuyAcre").removeClass("hover");

    // set confirm to true
    confirmBuyAcre = true;
  }
}

// ----------------------------------------
// Next Round
// Are you sure to proceed to the next round? Yes / No -> when one of them is not confirmed -> should have a visual cue
function updatesVisualConfirmes() {
  // update visual
  let confirmentations = [confirmFood, confirmSowing, confirmSellAcre, confirmBuyAcre];
  let idIdentifier = ["#cFood", "#cSowing", "#cSellAcre", "#cBuyAcre"];
  let everythingIsConfirmed = true;

  for (let i = 0; i < confirmentations.length; i++) {
    if (confirmentations[i]) {
      $(idIdentifier[i]).addClass("confirmedTrue");
      $(idIdentifier[i]).removeClass("confirmedFalse");
    }
    else {
      $(idIdentifier[i]).addClass("confirmedFalse");
      $(idIdentifier[i]).removeClass("confirmedTrue");
      everythingIsConfirmed = false; // something isn't confirmed
    }
  }

}

function nextRoundButtonPressed() {
  // one task is not confirmed -> ask before proceding to the next round
  if (taskNotFinished()) {
    confirmentationOnNextRound();
  }
  else {
    nextRound();
  }

}

function taskNotFinished() {
  if (confirmFood && confirmSowing && confirmSellAcre && confirmBuyAcre) {
    return false;
  }
  return true;
}

// creates html for displaying next round confirmentation
function confirmentationOnNextRound() {

}

function nextRound() {
  // update variables value
  year++
  grains += fieldYield;
  calcAcrePrice();
  // update variables visual
  setUpRound();
  updatesVisualConfirmes()

  // enables input
  let inputfield = ["#inputfieldFood", "#inputfieldSowing", "#inputfieldAcreSell", "#inputfieldAcreBuy"];
  let button = ["#buttonFood", "#buttonSowing", "#buttonSellAcre", "#buttonBuyAcre"];

  for (let i = 0; i < inputfield.length; i++) {
    $(inputfield[i]).prop("disabled", false);
    $(button[i]).prop("disabled", false);
    $(button[i]).addClass("active");
    $(button[i]).addClass("hover");
  }
}






