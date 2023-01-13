const inputsNodeList = document.querySelectorAll("input");
const inputs = [...inputsNodeList];
const submitBtn = document.querySelector("button");
const form = document.querySelector("form");

window.onload = function () {
  const form = document.querySelector("form");
  form.style.display = "block";
  form.classList.add("animated");
};

function showError(input, span) {
  if (input.id === "email") {
    span.textContent = "Not an email address!";
  } else if (input.id === "country") {
    span.textContent = "Country should be between 5 and 45 symbols";
  } else if (input.id === "zip") {
    span.textContent = "Zip should be more than 3 symbols";
  }
  input.classList.add("error");
}

function checkPasswords() {
  const spanPassword = inputs[3].nextElementSibling;
  const spanConfirmPassword = inputs[4].nextElementSibling;

  if (!inputs[3].checkValidity()) {
    if (inputs[3].value !== "") {
      inputs[3].classList.add("error");
      spanPassword.textContent =
        "1 uppercase, 1 lowercase, 1 digit. Min 12 symbols";
    }
  } else if (inputs[3].value !== inputs[4].value && inputs[4].value) {
    inputs[3].classList.add("error");
    inputs[4].classList.add("error");
    spanPassword.textContent = "Passwords do not match";
    spanConfirmPassword.textContent = "Passwords do not match";
  } else {
    inputs[3].classList.remove("error");
    inputs[4].classList.remove("error");
    spanPassword.textContent = "";
    spanConfirmPassword.textContent = "";
  }
}

function renderOK() {
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.classList.add("ok");
  body.textContent = "OK!";
}

function init() {
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      const span = input.nextElementSibling;
      if (input.value === "") {
        input.classList.remove("error");
        span.textContent = "";
      }
      if (input.id === "password" || input.id === "confirmpassword") {
        checkPasswords();
        return;
      }

      if (input.value !== "") {
        if (input.checkValidity()) {
          input.classList.remove("error");
          span.textContent = "";
        } else if (!input.checkValidity()) {
          showError(input, span);
        }
      }
    });
  });

  submitBtn.addEventListener("click", (event) => {
    const spans = Array.from(document.querySelectorAll("span"));
    let isValid = true;

    spans.forEach((item) => {
      if (item.textContent !== "") {
        isValid = false;
      }
    });
    if (!form.checkValidity() || isValid === false) {
      event.preventDefault();
    } else {
      renderOK();
    }
  });
}

init();
