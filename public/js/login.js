const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form")

const loginFormHandle = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    // This ensures both inputs are there.
    if(!username || !password){
        alert("You have not entered a username/password");
        return;
    }

    // This validates the password length
    if(password.length < 8){
        alert("Password must be 8 characters or longer!");
        return;
    }

    const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    });

    if(response.ok){
        document.location.replace("/dashboard");
    }else{
        alert(response.statusText)
    }


}

const signupFormHandle = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    // This ensures both inputs are there.
    if(!username || !password){
        alert("You must enter both a username and a password");
        return;
    }

    // This validates the password length
    if(password.length < 8){
        alert("Password must be at least 8 characters long!");
        return;
    }

    const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type" : "application/json"}
    })

    if (response.ok){
        document.location.replace("/dashboard");
    }else {
        alert(response.statusText);
    }
}    
loginForm.addEventListener("submit", loginFormHandle);
signupForm.addEventListener("submit", signupFormHandle);