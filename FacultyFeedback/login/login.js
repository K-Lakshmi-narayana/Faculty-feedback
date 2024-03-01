let loginForm = document.getElementById("login-form");
let signUpForm = document.getElementById("signup-form");
let createAcBtn = document.getElementById("create-ac-btn");
let gotoLoginBtn = document.getElementById("goto-login-btn");
let signupErr = document.getElementById("signup-err");
let loginErr = document.getElementById("login-err");
let verifyForm = document.getElementById("verify-form");
let verifyErr = document.getElementById("verify-err");
let email = document.getElementById("signup-email");
let suname = document.getElementById("signup-uname");
let spass = document.getElementById("signup-pass");
let scpass = document.getElementById("signup-cpass");

let code = Math.ceil(Math.random() * 1000000);

verifyForm.classList.add("d-none");

function reqFunc(e, r) {
    let elem = document.getElementById(e);
    let reqtext = document.getElementById(r);
    if (elem.value == "") {
        elem.style.borderColor = "red";
        reqtext.classList.remove("d-none");
    }
    else {
        elem.style.borderColor = "#034C03";
        reqtext.classList.add("d-none");
    }
}

signUpForm.classList.add("d-none");
createAcBtn.onclick = function () {
    loginForm.classList.add("d-none");
    signUpForm.classList.remove("d-none");
}

gotoLoginBtn.onclick = function () {
    loginForm.classList.remove("d-none");
    signUpForm.classList.add("d-none");
}

let verifyCode = () => {
    signUpForm.classList.add("d-none");
    verifyForm.classList.remove("d-none");
    sendEmail(code);
}

let evalEmailUname = async (em, un, pw) => {
    let res;
    let b = new FormData();
    b.append("email", em);
    b.append("uname", un);
    b.append("pass", pw);
    await fetch('emailEval.php', {
        method: 'POST',
        body: b
    })
        .then(response => response.text())
        .then(data => res = data);
    signupErr.textContent = res;
    if (res == "") {
        verifyCode();
    }
}

let evalLogin = async (u, p) => {
    let res;
    let b = new FormData();
    b.append("uname", u);
    b.append("pass", p);
    await fetch('loginEval.php', {
        method: "POST",
        body: b
    })
        .then(resp => resp.text())
        .then(data => res = data);
    loginErr.textContent = res;
    if (res == "") {
        if (u == "Mahendra" || u == "Hima Bindu"){
            document.cookie = "uname="+u+";path=/home;";
            window.location.replace("../home/facHome.html");
        }else{
            document.cookie = "uname="+u+";path=/home;";
            window.location.replace("../home/home.html");
        }
    }
}

function signup() {
    if (email.value == "") {
        reqFunc("signup-email", "email-req");
    }
    else {
        let regex = /^[rr][0-9]{6}[@rguktrkv]+\.[ac]+\.[in]+$/
        if (regex.test(email.value)) {
            signupErr.textContent = "";
            if (suname.value == "") {
                reqFunc("signup-uname", "suname-req");
            } else if (spass.value == "") {
                reqFunc("signup-pass", "spass-req");
            } else if (scpass.value == "") {
                reqFunc("signup-cpass", "scpass-req");
            } else if (spass.value != scpass.value) {
                signupErr.textContent = "Passwords doesn't match";
            } else {
                signupErr.textContent = "";
                evalEmailUname(email.value, suname.value, spass.value);

            }
        } else {
            signupErr.textContent = "Invalid Email";
        }
    }
}

function login() {
    let luname = document.getElementById("login-username");
    let lpass = document.getElementById("login-pass");

    if (luname.value == "") {
        reqFunc("login-username", "uname-req");
    } else if (lpass.value == "") {
        reqFunc("login-pass", "pass-req");
    } else {
        evalLogin(luname.value, lpass.value);
    }
}

function sendEmail(code) {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "klaxminarayana2004@gmail.com",
        Password: "098005BB2CE462FEB3945992CB77038B85CD",
        To: email.value,
        From: "klaxminarayana2004@gmail.com",
        Subject: "Verification code",
        Body: code,
    })
        .then(function (message) {
            alert("A verification code has been sent to your mail");
            console.log(message);
        });

}

let verCode = async () => {
    verifyErr.textContent = "";
    let em = email.value;
    let un = suname.value;
    let pw = spass.value;
    let res;
    let b = new FormData();
    b.append("email", em);
    b.append("uname", un);
    b.append("pass", pw);
    await fetch('verify.php', {
        method: 'POST',
        body: b
    })
        .then(response => response.text())
        .then(data => res = data);
    if (res == "") {
        document.cookie = "uname="+un+";path=/home;";
        window.location.replace("../home/home.html");
    }
}

function verific() {
    let ver = document.getElementById("verify");
    if (code == ver.value) {
        verCode();
    } else {
        verifyErr.textContent = "Invalid code!"
    }
}