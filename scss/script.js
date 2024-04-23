function handleClick(event) {
  event.preventDefault();
  const form = document.getElementById("feedback-form");
  if (validateForm(form)) {
    document.getElementById("confirmation-message").classList.remove("hidden");
    form.reset();
  }
}

function validateEmail($email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test($email);
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach(input => {
    const formGroup = input.closest(".form-group");
    const errorMessage = formGroup.querySelector(".error-message");
    const emailErrorMessage = formGroup.querySelector(".email-error-message");

    if (!input.value.trim()) {
      isValid = false;
      formGroup.classList.add("error");
      input.classList.add("error-border");
      if (!errorMessage) {
        const errMsg = document.createElement("div");
        errMsg.classList.add("error-message");
        errMsg.textContent = "Please fill out this field.";
        if (emailErrorMessage && formGroup.contains(emailErrorMessage)) {
          formGroup.removeChild(emailErrorMessage);
        }
        formGroup.appendChild(errMsg);
      }
    } else {
      if (input.type === "email" && !validateEmail(input.value)) {
        input.classList.add("mail-error-border");
        isValid = false;
        if (!emailErrorMessage) {
          const emailErrorMsg = document.createElement("div");
          emailErrorMsg.classList.add("email-error-message");
          emailErrorMsg.textContent = "Please enter a valid email address.";
          if (errorMessage && formGroup.contains(errorMessage)) {
            formGroup.removeChild(errorMessage);
          }
          formGroup.appendChild(emailErrorMsg);
        }
      } else {
        if (emailErrorMessage && formGroup.contains(emailErrorMessage)) {
          input.classList.remove("mail-error-border");
          formGroup.removeChild(emailErrorMessage);
        }
      }
      formGroup.classList.remove("error");
      input.classList.remove("error-border");
      if (errorMessage && formGroup.contains(errorMessage)) {
        formGroup.removeChild(errorMessage);
      }
    }
  })

  return isValid;
}

const submitForm = document.querySelector("button[type='submit']")
submitForm.addEventListener("click", handleClick);

