// // dashboard side bar
// const menuBtn = document.querySelector(".menu-btn");
// const sidebar = document.querySelector(".sidebar");
// const overlay = document.querySelector(".overlay");
// const navLinks = document.querySelectorAll(".nav-link");
// const contentSections = document.querySelectorAll(".content-section");

// menuBtn.addEventListener("click", () => {
//   sidebar.classList.toggle("open");
//   overlay.classList.toggle("show");
// });

// overlay.addEventListener("click", () => {
//   sidebar.classList.remove("open");
//   overlay.classList.remove("show");
// });

// navLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     const contentId = e.target.dataset.content;
//     contentSections.forEach((section) => {
//       section.classList.remove("show");
//     });
//     const targetSection = document.getElementById(contentId);
//     targetSection.classList.add("show");
//   });
// });

// help and support
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

const navLinks = document.querySelectorAll(".nav-link");

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

// toggle amount view
const balanceAmount = document.getElementById("balance-amount");
const cardHolderName = document.getElementById("card-holder-name");
const toggleBalanceBtn = document.getElementById("toggle-balance");
const eyeIcon = document.getElementById("eye-icon");

// Set the initial balance and card holder name
balanceAmount.textContent = "9425";
cardHolderName.textContent = "David Bekam";

// Toggle balance display on button click
toggleBalanceBtn.addEventListener("click", () => {
  if (balanceAmount.textContent === "****") {
    balanceAmount.textContent = "9425"; 
    eyeIcon.style.stroke = "#333";
  } else {
    balanceAmount.textContent = "****";
    eyeIcon.style.stroke = "#ccc"; 
  }
});

// categories section

// Sample data for spending categories
const categories = [
  {
    name: "Restaurant",
    icon: "restaurant",
    spent: 420.26,
    total: 1000,
    color: "#b3ffda",
    iconColor: "#33cc99",
  },
  {
    name: "Transport",
    icon: "transport",
    spent: 420.26,
    total: 1000,
    color: "#ffe0b3",
    iconColor: "#ff9933",
  },
  {
    name: "Holiday",
    icon: "holiday",
    spent: 420.26,
    total: 1000,
    color: "#b3d9ff",
    iconColor: "#3377cc",
  },
];

// Function to create a category element
function createCategoryElement(category) {
  const categoryElement = document.createElement("div");
  categoryElement.classList.add("category");

  const iconElement = document.createElement("div");
  iconElement.classList.add("category-icon", category.icon);
  iconElement.style.backgroundColor = category.color;
  iconElement.style.color = category.iconColor;
  iconElement.innerHTML = "<span>i</span>";

  const infoElement = document.createElement("div");
  infoElement.classList.add("category-info");

  const nameElement = document.createElement("h3");
  nameElement.textContent = category.name;

  const progressBarElement = document.createElement("div");
  progressBarElement.classList.add("progress-bar");

  const progressElement = document.createElement("div");
  progressElement.classList.add("progress");
  progressElement.style.width = `${(category.spent / category.total) * 100}%`;
  progressElement.style.backgroundColor = category.color;

  progressBarElement.appendChild(progressElement);

  const spentElement = document.createElement("p");
  spentElement.classList.add("spent");
  spentElement.textContent = `$ ${category.spent.toFixed(
    2
  )} Used / from $ ${category.total.toFixed(2)}`;

  infoElement.appendChild(nameElement);
  infoElement.appendChild(progressBarElement);
  infoElement.appendChild(spentElement);

  categoryElement.appendChild(iconElement);
  categoryElement.appendChild(infoElement);

  return categoryElement;
}

// Render categories
const categoryList = document.querySelector(".category-list");
categories.forEach((category) => {
  const categoryElement = createCategoryElement(category);
  categoryList.appendChild(categoryElement);
});

// transaction history

// Sample transaction data
const transactions = [
  {
    name: "Paypal Transfer",
    details: "November 24th, 2020 at 2:45 AM",
    icon: "↓",
    amount: -98.21,
    user: {
      name: "Thomas Edison",
      username: "@thomasedis",
      avatar: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Upgrade Storage Plan",
    details: "November 24th, 2020 at 2:45 AM",
    icon: "↓",
    amount: 200,
    company: {
      name: "Dropbox",
      logo: "https://via.placeholder.com/30",
    },
  },
  {
    name: "Bank Transfer",
    details: "September 8th, 2020 at 11:56 AM",
    icon: "↑",
    amount: 500,
    user: {
      name: "Louis Khun",
      username: "@thomasedis",
      avatar: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Youtube Monthly Subcritpion",
    details: "September 5th, 2020 at 11:56 AM",
    icon: "↓",
    amount: -200,
    company: {
      name: "Youtube",
      logo: "https://via.placeholder.com/30",
    },
  },
  {
    name: "Bank Transfer",
    details: "September 5th, 2020 at 11:56 AM",
    icon: "↑",
    amount: 500,
    user: {
      name: "Isabella Sirait",
      username: "@thomasedis",
      avatar: "https://via.placeholder.com/50",
    },
  },
];

// Function to create a transaction element
function createTransactionElement(transaction) {
  const transactionElement = document.createElement("div");
  transactionElement.classList.add("transaction");

  const iconElement = document.createElement("div");
  iconElement.classList.add(
    "transaction-icon",
    transaction.amount < 0 ? "expense" : "income"
  );
  iconElement.textContent = transaction.icon;

  const infoElement = document.createElement("div");
  infoElement.classList.add("transaction-info");

  const nameElement = document.createElement("h3");
  nameElement.classList.add("transaction-name");
  nameElement.textContent = transaction.name;

  const detailsElement = document.createElement("p");
  detailsElement.classList.add("transaction-details");
  detailsElement.textContent = transaction.details;

  infoElement.appendChild(nameElement);
  infoElement.appendChild(detailsElement);

  const amountElement = document.createElement("span");
  amountElement.classList.add(
    "transaction-amount",
    transaction.amount < 0 ? "expense" : "income"
  );
  amountElement.textContent = `${
    transaction.amount < 0 ? "-" : "+"
  } $${Math.abs(transaction.amount).toFixed(2)}`;

  transactionElement.appendChild(iconElement);
  transactionElement.appendChild(infoElement);
  transactionElement.appendChild(amountElement);

  return transactionElement;
}

// Render transactions
const transactionList = document.querySelector(".transaction-list");
transactions.forEach((transaction) => {
  const transactionElement = createTransactionElement(transaction);
  transactionList.appendChild(transactionElement);
});
