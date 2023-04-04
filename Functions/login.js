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
// End UI

//Function
// Register function
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
  }
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
    // console.log(currentUrl())
    // if(currentUrl() == "home.html") {
    //   window.location.assign("home.html")
    // }
    // else window.location.assign("checkout.html")
    window.location.assign("home.html");
    data.status = "true"
    let json = JSON.stringify(data);
    localStorage.setItem(email, json);
  } else {
    error.classList.add("error");
    error.innerHTML = "*Wrong email or password";
  }
}

// End login function

console.log(localStorage.getItem(email))

function data() {
  return localStorage.getItem(email)
}