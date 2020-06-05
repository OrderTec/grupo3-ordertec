function campValidation() {
  const name = document.getElementById("user-name").value;
  const password = document.getElementById("password").value;
  const cpf = document.getElementById("cpf").value;
  const password_confirmation = document.getElementById("confirm-password")
    .value;
  const email = document.getElementById("email").value;
  const email_confirmation = document.getElementById("email-confirm").value;
  if (
    name == "" ||
    password == "" ||
    password_confirmation == "" ||
    email == "" ||
    email_confirmation == "" ||
    cpf == ""
  )
    alert("Por favor, preencha todos os campos.");
  else signInValidation();
}

function signInValidation() {
  const password = document.getElementById("password").value;
  const password_confirmation = document.getElementById("confirm-password")
    .value;
  const email = document.getElementById("email").value;
  const email_confirmation = document.getElementById("email-confirm").value;

  if (password != password_confirmation) alert("Senha não corresponde.");
  else if (email != email_confirmation) alert("E-mail não corresponde.");
  else definesNewUser();
}

function definesNewUser() {
  var data = {};
  data.NAME = document.getElementById("user-name").value;
  data.EMAIL = document.getElementById("email").value;
  data.PASSWORD = document.getElementById("password").value;
  data.CPF = document.getElementById("cpf").value;
  userAlreadyExists(data);
}

function userAlreadyExists(data) {
  var cpf = document.getElementById("cpf").value;
  var url = `/usuario/${cpf}`;
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.send();
  var jsonresponse = xhr.responseText;
  if (jsonresponse == "[]") newUserRegister(data);
  else {
    alert("CPF já existe.");
  }
}

function newUserRegister(data) {
  var url = "/signin";
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(json);
  setTimeout(function () {
    window.location.assign("index.html");
  }, 1000);
}
