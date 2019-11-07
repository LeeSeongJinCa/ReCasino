document.querySelectorAll(".login_input").forEach(el => {
    el.addEventListener("keyup", () => {
        if (window.event.keyCode === 13) {
            login();
        }
    })
})

function login() {
    axios({
        method: "POST",
        url: server + ':5000/account/auth',
        data: {
            "id": document.getElementById("login_id").value,
            "pw": document.getElementById("login_pw").value,
        },
    })
    .then((data) => {
        localStorage.setItem("access_token", data.data.access_token);
        window.location.href = "snail.html";
    })
    .catch((data) => {
        document.querySelector(".error > p").style.display = "block";
        console.log(data);
    })
}