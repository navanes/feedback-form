import './css/style.css'
import handleClick from "./js/app.js";

document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit_btn');
  submitButton.addEventListener('click', handleClick);
});

