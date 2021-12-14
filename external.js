//Written by Constantin Gavrila (1 to 112)

//functions to alternate between dark and light registration buttons
function buyTicketsLight(){
	document.getElementById("buyTickets").setAttribute("src", "images/buyTickets2.png");
}
function regAsDriverLight(){
	document.getElementById("regAsDriver").setAttribute("src", "images/regAsDriver2.png");
}
function normalTickets(){
	document.getElementById("buyTickets").setAttribute("src", "images/buyTickets.png");
}
function normalDriver(){
	document.getElementById("regAsDriver").setAttribute("src", "images/regAsDriver.png");
}

//functions designed to show available options once the button is clicked
function showSpectator(){
	document.getElementById("regPageHeader").className = "showRow";
	document.getElementById("specOptions").className = "showRow";
	document.getElementById("racerOptions").className = "hideRow";
}
function showRacer(){
	document.getElementById("regPageHeader").className = "showRow";
	document.getElementById("racerOptions").className = "showRow";
	document.getElementById("specOptions").className = "hideRow";
}

//functions designated to take the user's choise and reveal the registration Form

//visitors
function driftV(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Drifting Experience";
	document.getElementById("choosenCatD").innerHTML = "Drift across an entire lap on our race track with one of our professional drifting drivers and enjoy a one in a life time experience!";
}
function raceV(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "DTM Experience";
	document.getElementById("choosenCatD").innerHTML = "Choose one of our DTM cars and do 3 track laps with a DTM driver, acieving speeds of over 300/km." + "<br/>" + "<br/>" + "Available cars:" + "<br/>" + "<br/>" + "BMW M3" + "<br/>" + "Porche 991GTS" + "<br/>" + "Aston Martin Vantage";
}
function grandPrixV(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Grand Prix tickets";
	document.getElementById("choosenCatD").innerHTML = "Book your seat for the highlight of the event, and see the Grand Prix live from meters away of the track.";
}
function karting(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Karting";
	document.getElementById("choosenCatD").innerHTML = "Take the wheel and race agains others, driving our 100HP Karts agains your friends or other visitors."+ "<br/>" + "<br/>" + "*Avalid driving licence must be presented before participating in the race."+ "<br/>" + "<br/>" + "**Groups of maximum 8 participants.";
}
function showRoomV(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Showroom admission";
	document.getElementById("choosenCatD").innerHTML = "Come and see the most amazing cars free of charge!" + "<br/>" + "<br/>" + "While the admission is free of charge, visitors must first book their visit.";
}

//competitors
function driftR(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Drift Race";
	document.getElementById("choosenCatD").innerHTML = "Register and participate in our Drift race on the second day of the event!";
}
function dtmRaceR(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "DTM Grand Prix";
	document.getElementById("choosenCatD").innerHTML = "Register and participate in the DTM Grand Prix on the last day of the event!";
}
function dragR(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Drag Race";
	document.getElementById("choosenCatD").innerHTML = "Register and participate in our Drag race on the third day of the event!";
}
function droneR(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Drone Race";
	document.getElementById("choosenCatD").innerHTML = "Register and participate in our Drone race on the first day of the event!";
}
function showRoomR(){
	document.getElementById("form").className = "showRow";
	document.getElementById("choosenCatH").innerHTML = "Showroom";
	document.getElementById("choosenCatD").innerHTML = "Register and showcast your car in our showroom!";
}

//function to validate the form
function validate(){
	var formData = [];
	formData[0] = document.getElementById("fName").value;
	formData[1] = document.getElementById("sName").value;
	formData[2] = document.getElementById("inputEmail1").value;
	formData[3] = document.getElementById("inputPhone").value;
	formData[4] = document.getElementById("termsCheckBox").value;
	if (formData[0].length < 2){
		document.getElementById("fNameHelp").innerHTML = "Not a valid name";
	}
	if (formData[1].length < 2){
		document.getElementById("sNameHelp").innerHTML = "Not a valid name";
	}
	if ((formData[2].indexOf('@')) < 1){
	document.getElementById("emailHelp").innerHTML = "Not a valid email";
	}	
	if (((/^\d+$/.test(formData[3])) == false) || (formData[3].length < 7) ){
		document.getElementById("phoneHelp").innerHTML = "Not a valid phone number";
	}	
	if(document.getElementById("termsCheckBox").checked == false){
		document.getElementById("checkBox").innerHTML = "Please read and accept terms and conditions";
	}
	if ((formData[0].length > 1) && (formData[1].length > 1) && ((formData[2].indexOf('@')) > 1) && (((/^\d+$/.test(formData[3])) == false) || (formData[3].length > 5)) && (document.getElementById("termsCheckBox").checked == true)){
		alert("You have been successfully registered");
		window.location="index.html";
	}
}
//Written by jamel boumazouna (112 to 157)
//initalise variable as 1 and shows first slide
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
//allows dots to know current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}
//function to move through slideshow
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//function needed for on click caption
function myFunction(imgs) {
  // Get the expanded image,not used but wont work without it
  var expandImg = document.getElementById("expandedImg");
  // Get the image text
  var imgText = document.getElementById("imgtext");
  // Use the value of the alt attribute of the clickable image as text inside the expanded image
  imgText.innerHTML = imgs.alt;
  // Show the container element (hidden with CSS)
  expandImg.parentElement.style.display = "block";
}
//function needed to play audio
      function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }