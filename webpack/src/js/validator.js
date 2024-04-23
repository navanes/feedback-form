function validateEmail($email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test($email);
}

export default function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll(".error-input");

  inputs.forEach(input => {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup.querySelector(".error-message");
    const emailErrorMessage = formGroup.querySelector(".email-error-message");

    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("border-red-500");
      if (!errorMessage) {
        const errMsg = document.createElement("div");
        errMsg.classList.add("error-message", "text-red-500", "text-xs", "mt-1");
        errMsg.textContent = "Please fill out this field.";
        if (emailErrorMessage && formGroup.contains(emailErrorMessage)) {
          formGroup.removeChild(emailErrorMessage);
        }
        formGroup.appendChild(errMsg);
      }
    } else {
      if (input.type === "email" && !validateEmail(input.value)) {
        isValid = false;
        input.classList.add("border-red-500");
        if (!emailErrorMessage) {
          const emailErrorMsg = document.createElement("div");
          emailErrorMsg.classList.add("email-error-message", "text-red-500", "text-xs", "mt-1");
          emailErrorMsg.textContent = "Please enter a valid email address.";
          if (errorMessage && formGroup.contains(errorMessage)) {
            formGroup.removeChild(errorMessage);
          }
          formGroup.appendChild(emailErrorMsg);
        }
      } else {
        if (emailErrorMessage && formGroup.contains(emailErrorMessage)) {
          formGroup.removeChild(emailErrorMessage);
          input.classList.remove("border-red-500");
        }
      }
      if (errorMessage && formGroup.contains(errorMessage)) {
        formGroup.removeChild(errorMessage);
        input.classList.remove("border-red-500");
      }
    }
  })

  return isValid;
}