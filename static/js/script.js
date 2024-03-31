// dashboard side bar
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const contentSections = document.querySelectorAll(".content-section");
const navLinks = document.querySelectorAll(".nav-link");


menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});



// this is to go to other parts of the page like profile, support etc
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const contentId = e.target.dataset.content;
    let url;

    switch (contentId) {
      case "dashboard":
        url = "dashboard.html";
        break;
      case "profile":
        url = "profile.html";
        break;
      case "help-and-support":
        url = "help-and-support.html";
        break;
      case "transfer":
        url = "transfer.html";
        break;
      case "logout":
        url = "logout.html";
        break;
      default:
        url = "index.html";
    }

    window.location.href = url;
  });
});

// toggle amount(balance) view
const balanceAmount = document.getElementById("balance-amount");
const cardHolderName = document.getElementById("card-holder-name");
const toggleBalanceBtn = document.getElementById("toggle-balance");
const eyeIcon = document.getElementById("eye-icon");

// Toggle balance display on button click
toggleBalanceBtn.addEventListener("click", () => {
  if (balanceAmount.textContent === "****") {
    balanceAmount.textContent = ""; 
    eyeIcon.style.stroke = "#333";
  } else {
    balanceAmount.textContent = "****";
    eyeIcon.style.stroke = "#ccc"; 
  }
});


// help and support accordion
const items = document.querySelectorAll(".accordion button");

var questions = document.getElementsByClassName("question");
for (var i = 0; i < questions.length; i++) {
questions[i].addEventListener("click", function () {
  this.classList.toggle("active");

  var answer = this.nextElementSibling;
  if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.style.marginBottom = "0";
  } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.marginBottom = "1.2em";
  }
})}