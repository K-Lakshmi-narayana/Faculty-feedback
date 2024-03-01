let cook = document.cookie.split("=")[1];
let fbCon = document.getElementById("fb-container");

function logout(){
    document.cookie = "uname=; path=/lucky/home;"
    window.location.replace("../login/login.html");
}

function nofb() {
    let d = document.createElement("div");
    d.classList.add("text-center", "mt-5");
    fbCon.appendChild(d);
    let h = document.createElement("h1");
    h.classList.add("tq");
    h.textContent = "No Feedback responses received...";
    d.appendChild(h);
}

function createCard(r, o, n){
    let cardCon = document.createElement("div");
    fbCon.appendChild(cardCon);
    let card = document.createElement("div");
    cardCon.appendChild(card);
    let img = document.createElement("img");
    img.src="../login/img/profile.png";
    img.classList.add("fb-img");
    card.appendChild(img);
    let name = document.createElement("span");
    name.textContent = "Some Student";
    name.classList.add("fb-name");
    card.appendChild(name);
    let ratCon = document.createElement("div");
    ratCon.classList.add("d-flex", "m-3");
    card.appendChild(ratCon);
    let rating = document.createElement("p");
    rating.textContent = "Rating: "+ r;
    rating.classList.add("fb-name", "fb-rat");
    ratCon.appendChild(rating);
    let star = document.createElement("i");
    star.classList.add("fa-regular", "fa-star", "fa-solid", "greeen", "m-1");
    ratCon.appendChild(star);
    if (o != ""){
        let op = document.createElement("p");
        op.textContent = "Opinion: " + o;
        op.classList.add("op");
        card.appendChild(op);
    }
    if (n % 2 == 0){
        cardCon.classList.add("rcard-con");
        card.classList.add("rcard");
    }else{
        cardCon.classList.add("lcard-con");
        card.classList.add("lcard");
    }
    
}

let getfb = async()=>{
    let res;
    let b = new FormData();
    b.append("fac", cook);
    await fetch('getfb.php', {
        method: "POST",
        body: b
    })
        .then(resp => resp.text())
        .then(data => res = data);
    console.log(res);
    if (res == ""){
        nofb();
    } else {
        let resArr = res.split("-");
        for (let arr in resArr){
            if (resArr[arr] != ""){
                let subArr = resArr[arr].split("+");
                createCard(subArr[0], subArr[1], arr);
            }
        }
    }
}

getfb();