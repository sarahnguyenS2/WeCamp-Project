let loginEmail = sessionStorage.getItem("loginEmail");
if (loginEmail) {
  let loginData = getLocalData(loginEmail);
  if (loginData) {
    const loginBox = document.getElementById("login-box");
    let username = loginData.username;
    if (username) {
      loginBox.innerHTML = `<li><a href="#" id="login">${username}</a></li>
    <li><a href="#" id="order">Orders</a></li><li><a href="" id="logout">Sign Out</a></li>
    `;
    }
  }
}
function getLocalData(email) {
 // console.log(email);
 // console.log(localStorage.getItem(email));
  return JSON.parse(localStorage.getItem(email));

}
