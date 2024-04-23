import validateForm from "./validator";

export default function handleClick(event) {
  event.preventDefault();
  const form = document.getElementById("feedback-form");
  if (validateForm(form)) {
    document.getElementById("confirmation-message").classList.remove("hidden");
    form.reset();
  }
}
