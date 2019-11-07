const server = "http://10.156.147.139";

(() => {
    let headerFrame = `<header id="header_wrapper">
        <div id="logo">
            <img id="logo_image" onclick="location.href ='snail.html';" src="img/logo.png" alt="logo">
        </div>
        <div class="log_wrapper">
            <button id="log_header_button" class="log_button">Login</button>
            <button id="sig_header_button" class="log_button">Signup</button>
        </div>
    </header>`
    document.body.childNodes[1].insertAdjacentHTML("beforebegin", headerFrame);

    let commonCss = document.createElement("link");
    let loginButton = document.getElementById("log_header_button");
    let signupButton = document.getElementById("sig_header_button");
    loginButton.addEventListener("click", () => {
        if (UIsLogin()) {
            localStorage.removeItem("access_token");
        }
        location.href = "login.html";
    });
    signupButton.addEventListener("click", () => {
        location.href = "signup.html";
    });
    commonCss.setAttribute("href", "css/common.css");
    commonCss.setAttribute("rel", "stylesheet");
    document.head.appendChild(commonCss);
})();

function UIsLogin() {
    let loginButton = document.getElementById("log_header_button");
    if (localStorage.getItem("access_token")) {
        loginButton.textContent = "Logout";
        return true;
    } else {
        loginButton.textContent = "Login";
        return false;
    }
}

window.onload = () => {
    UIsLogin();
}