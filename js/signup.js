document.querySelectorAll(".signup_input").forEach(el => {
    el.addEventListener("keyup", () => {
        if (window.event.keyCode === 13) {
            signup();
        }
    })
})

function signup() {
    let id = document.getElementById("signup_id"),
        pw = document.getElementById("signup_pw");
    if (id.value.trimEnd() === "" || pw.value.trimEnd() === "") {
        alert("아이디 또는 비밀번호를 입력하세요.");
        id.focus();
        return;
    }
    axios({
        method: "POST",
        url: server + ':5000/account/register',
        data: {
            "id": id.value.trimEnd(),
            "pw": pw.value.trimEnd(),
        },
    })
    .then((data) => {
        console.log(data);
        window.location.href = "login.html";
    })
    .catch((data) => {
        document.querySelector(".error > p").style.display = "block";
        id.focus();
        console.log(data);
    })
}