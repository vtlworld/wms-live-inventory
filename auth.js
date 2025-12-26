import { login } from "./auth.js";

async function init() {
  // ❌ do NOT auto login
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await login(email, password);
    console.log("Login success");
  } catch (e) {
    alert("Login failed");
  }
});

init();
