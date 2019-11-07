const snails = document.querySelectorAll(".snail");
const trackWidth = parseFloat(getComputedStyle(document.querySelector("#track")).width);
const selectSnail = document.querySelectorAll(".select_snail");
let dalpange;

function snailGameStart(userSelect) {
    // let refreshInterval = setInterval(() => {
        // if (checkSnail()) {
        //     alert(` 번 달팽이가 승리하였습니다.`);
        //     readySnail();
        //     clearInterval(refreshInterval);
        // } else {
            axios({
                method: "POST",
                url: `${server}:5000/game/dalpange`,
                data: {
                    "color": "g",
                    "bet": parseInt(document.querySelector("#user_betting > input").value)
                },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                }, 
            })
            .then((data) => {
                console.log(data);
                console.log("성공");
                return;
                // moveSnail();
                clearInterval(refreshInterval);
            })
            .catch((data) => {
                console.log(data);
                console.log("실패");
                return;
                // clearInterval(refreshInterval);
            })
        // }
    // }, 1000);
}

function moveSnail(data) {
    snails.forEach((el, i) => {
        el.style.right = `${parseFloat(getComputedStyle(el).right) - data[i]}px`;
    });
}

function checkSnail() {
    for (let i = 0; i < snails.length; i++) {
        if (parseFloat(getComputedStyle(snails[i]).right) <= 0) {
            return true;
        }
    }
}

function readySnail() {
    snails.forEach(el => el.style.right = `${trackWidth - 40}px`);
}

function onlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) event.returnValue = false;
}
/* 
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/LeeSeongJinCa/ReCasino.git
git push -u origin master
*/

selectSnail.forEach((el, i) => {
    el.addEventListener("click", () => {
        if (confirm(`${i + 1}번 달팽이를 고르셨습니다.\n시작하시겠습니까?`)) {
            snailGameStart(i + 1);
        }
    });
});

window.onload = () => {
    dalpange = io.connect("http://10.156.147.139:5555");
    dalpange.emit("showdata");
    dalpange.on("showdata", datas => {
        console.log(datas);
        document.querySelector("#view_data").innerHTML = "";
        Object.keys(datas).map(key => {
            let div = document.createElement("div");
            let tag = `<p>
                    <span>${key}</span>
                    <span>${datas[key].color}</span>
                    <span>${datas[key].bet}</span>
                </p>`
            div.insertAdjacentHTML("beforeend", tag);
            document.querySelector("#view_data").insertAdjacentElement("beforeend", div);
        });
    });
    dalpange.on("gamevalue", datas => {
        console.log(datas); // 1 ~ 30 random
        // 거리 당 걸리는 시간
        
    });
    dalpange.on("gamelastvalue", datas => {
        console.log(datas);
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
*/
/*
! socket connection
const socketMingi = io.connect("http://10.156.147.139:5554/mingi");
socketMingi.on("get", msg => {

});
socket.emit("mes", `${userName} : ${obj.inputData.value}`);
*/