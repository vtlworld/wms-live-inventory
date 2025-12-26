import { login } from "./auth.js";

async function init() {
  try {
    await login("pavithrasivakumar026@gmail.com", "123456");
    console.log("Login success");
  } catch (e) {
    console.error("Login failed");
  }
}

init();
