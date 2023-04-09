const logoutButton = document.getElementById("logout")
logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("loginEmail");
    var currentUrl = window.location.href;
    window.location.href = currentUrl;
})
