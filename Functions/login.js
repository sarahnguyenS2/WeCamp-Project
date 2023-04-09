/*
  NAB Innovation Center Vietnam
  Program: WeCamp batch 2
  Assessment: Assignment 1
  Authors: Hao Nguyen
  Created  date: 25/03/2023
  Last modified: 09/04/2023
  Acknowledgement: Acknowledge the resources that you use here. 
*/

// UI
const registerButton = document.querySelector("#register");
const loginButton = document.querySelector("#login");
const container = document.querySelector("#container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function resigterFunction(e) {
  event.preventDefault();

  const username = document.querySelector("#name").value;
  const email = document.querySelector("#register-email").value;
  const password = document.querySelector("#register-password").value;
  const error = document.querySelector("#register-error");

  const user = {
    username: username,
    email: email,
    password: password,
    status: false,
  };

  if (localStorage.getItem(email)) {
    error.classList.add("error");
    error.innerHTML = "*User has already existed";
  } else {
    let json = JSON.stringify(user);
    localStorage.setItem(email, json);
    error.classList.add("error");
    error.innerHTML = "*Register successed";
  }

  document.querySelector("#name").value = "";
  document.querySelector("#register-email").value = "";
  document.querySelector("#register-password").value = "";
}
// End register function

// Login function
function loginFunction(e) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = localStorage.getItem(email);
  const data = JSON.parse(user);

  const error = document.querySelector("#error");
  if (user == null) {
    error.classList.add("error");
    error.innerHTML = "*Wrong email or password";
  } else if (email == data.email && password == data.password) {
    var currentUrl = window.location.href;
    var redirectParam = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    sessionStorage.setItem("currentLocation", currentUrl);
    switch (redirectParam) {
      case "home":
        window.location.href = "home.html";
        break;
      case "about":
        window.location.href = "about.html";
        break;
      case "product":
        window.location.href = "product.html";
        break;
      case "contact":
        window.location.href = "contact.html";
        break;
      case "cart":
        window.location.href = "cart.html";
        break;
      case "detail":
        window.location.href = "detail.html";
        break;
      default:
        window.location.href = "home.html";
    }
    let json = JSON.stringify(data);
    localStorage.setItem(email, json);
    sessionStorage.setItem("loginEmail", email);
  } else {
    error.classList.add("error");
    error.innerHTML = "*Wrong email or password";
  }
}

// End login function

//login UI after login
const username1 = localStorage.name;
if (username1) {
}
