const trackWidth = parseFloat(getComputedStyle(document.querySelector("#track")).width);
const bettingInput = document.querySelector("#user_betting > input");
const selectSnail = document.querySelectorAll(".select_snail");
const resultRace = document.querySelector("#result_race > p");
const viewData = document.querySelector("#view_data");
const snails = document.querySelectorAll(".snail");
let dalpange;

function snailGameStart(userSelect) {
    axios({
        method: "POST",
        url: `${server}:5000/game/dalpange`,
        data: {
            "color": userSelect,
            "bet": parseInt(bettingInput.value)
        },
        headers: {
            "Authorization": "Bearer " + getToken()
        },
    })
        .then(() => {
            return;
        })
        .catch(() => {
            alert("오류가 발생하였습니다.\n다시 시도해주세요.");
            return;
        })
}

function moveSnail(datas) {
    Object.keys(datas).map((key) => {
        if      (key === "r") snails[0].style.right = `${parseFloat(getComputedStyle(snails[0]).right) - datas["r"]}px`;
        else if (key === "g") snails[1].style.right = `${parseFloat(getComputedStyle(snails[1]).right) - datas["g"]}px`;
        else if (key === "b") snails[2].style.right = `${parseFloat(getComputedStyle(snails[2]).right) - datas["b"]}px`;
    });
}

function checkSnail() {
    for (let i = 0; i < snails.length; i++)
        if (parseFloat(getComputedStyle(snails[i]).right) <= 0) return true;
}

function readySnail() {
    snails.forEach(el => el.style.right = `${trackWidth - 70}px`);
}

function onlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getUserCash() {
    axios({
        method: "POST",
        url: server + ":5000/account/cash",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
        .then(data => {
            setUserCash(data.data.cash);
        })
        .catch(() => {
            console.log("돈을 못 가져왔습니다.");
        })
}

function setUserCash(cash) {
    document.querySelector("#view_cash").innerHTML = numberWithCommas(cash);
}

function viewRestTime() {
    let i = 25;
    let refreshInterval = setInterval(() => {
        if (i == 0) clearInterval(refreshInterval);
        else resultRace.innerHTML = i--;
    }, 1000);
}

function showBettingUser(datas) {
    viewData.innerHTML = "";
    Object.keys(datas).map(key => {
        let div = document.createElement("div");
        let tag = `<li>
                    <span>${key}</span>
                    <span>${datas[key].color}</span>
                    <span>${datas[key].bet}</span>
                </li>`
        div.insertAdjacentHTML("beforeend", tag);
        viewData.insertAdjacentElement("beforeend", div);
    });
}

function whoIsWin(datas) {
    Object.keys(datas).map(key => {
        if (datas[key] === 1) {
            if (key === "r") {
                resultRace.innerHTML = `빨간 달팽이가 승리하였습니다.`;
            } else if (key === "b") {
                resultRace.innerHTML = `파란 달팽이가 승리하였습니다.`;
            } else if (key === "g") {
                resultRace.innerHTML = `초록 달팽이가 승리하였습니다.`;
            }
        }
    });
}

function getRank() {
    axios({
        method: "GET",
        url: server + ":5000/account/rank"
    })
        .then(datas => {
            let data = datas.data;
            let rank = document.querySelector("#view_rank");
            Object.keys(data).map(key => Object.keys(data[key]).map(user => {
                let li = `<li>
                        <span>${user}</span>
                        <span>${data[key][user]}</span>
                    </li>`
                rank.insertAdjacentHTML("beforeend", li);
            })
            );
        })
        .catch(error => {
            console.log(error);
        })
}

function getToken() {
    return localStorage.getItem("access_token");
}

selectSnail.forEach(el => {
    el.addEventListener("click", () => {
        if (bettingInput.value.trim() == "") {
            return alert("배팅금을 입력하세요.");
        }
        if (parseInt(bettingInput.value.trim()) < 0) {
            return alert("배팅금은 0원 이상입니다.");
        }
        if (UIsLogin()) {
            selectSnail.forEach(el => el.classList.remove("select_snail_selected"));
            el.classList.add("select_snail_selected");
            snailGameStart(el.childNodes[1].innerHTML[0]);
        } else {
            alert("로그인을 해주세요.");
        }
    });
});

window.onload = () => {
    UIsLogin();
    dalpange = io.connect("http://10.156.147.139:5555");
    dalpange.emit("showdata");

    dalpange.on("showdata", datas => {
        getUserCash();
        showBettingUser(datas);
    });

    dalpange.on("gamevalue", datas => {
        bettingInput.setAttribute("disabled", "true");
        moveSnail(datas);
    });

    dalpange.on("gamelastvalue", datas => {
        bettingInput.removeAttribute("disabled");
        bettingInput.value = "";
        viewData.innerHTML = "";
        selectSnail.forEach(el => el.classList.remove("select_snail_selected"));
        getUserCash();
        whoIsWin(datas);
        setTimeout(() => {
            readySnail();
            viewRestTime();
        }, 5000);
    });
}

/*
! axios connection
axios({
    method: "GET",
    url: server,
})
.then((data) => {
    console.log(data); // ex) [10, 20, 30, 40, 50]
    moveSnail(data);
    checkSnail();
})
.catch((data) => {
    console.log(data);
})

! socket connection
const socketMingi = io.connect("http://10.156.147.139:5554/mingi");
socketMingi.on("get", msg => {

});
socket.emit("mes", `${userName} : ${obj.inputData.value}`);
*/