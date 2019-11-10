const server = "http://10.156.147.139";

(() => {
    let headerFrame = `<header id="header_wrapper">
        <div id="logo">
            <a href="snail.html">
                <img id="logo_image" onclick="location.href ='snail.html';" src="img/logo.png" alt="logo">
            </a>
        </div>
        <div class="log_wrapper">
            <button id="log_header_button" class="log_button">
                <a href="login.html">Login</a>
            </button>
            <button id="sig_header_button" class="log_button">
                <a href="signup.html">Signup</a>
            </button>
        </div>
    </header>`
    document.body.childNodes[1].insertAdjacentHTML("beforebegin", headerFrame);
    document.querySelector("#log_header_button > a").addEventListener("click", () => {
        if (UIsLogin()) localStorage.removeItem("access_token");
    });
    let commonCss = document.createElement("link");
    commonCss.setAttribute("href", "css/common.css");
    commonCss.setAttribute("rel", "stylesheet");
    document.head.appendChild(commonCss);
})();

function UIsLogin() {
    let loginButton = document.querySelector("#log_header_button > a");
    if (getToken()) {
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