// js/app.js
import { login } from "./auth.js";

async function init() {
  try {
    // TEMP: use a read-only inventory user
    await login("inventory_user@email.com", "password");
    console.log("WMS login successful");
  } catch (err) {
    console.error(err.message);
    alert("WMS login failed");
  }
}

init();
