function logInVerify() {
  const cpf = document.getElementById("cpf").value;
  const password = document.getElementById("password").value;
  if (cpf == "" || password == "")
    alert("Por favor, preencha todos os campos.");
  else logIn(document.getElementById("cpf").value);
}

function logIn(cpf) {
  var url = `/usuario/${cpf}`;

  var xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.send();

  var jsonresponse = xhr.responseText;
  if (jsonresponse == "[]") alert("Usuário não encontrado.");
  else {
    var obj = JSON.parse(jsonresponse);
    passwordVerify(obj);
  }
}

function passwordVerify(obj) {
  if (obj[0].SENHA == document.getElementById("password").value) {
    localStorage.setItem("cpf", obj[0].CPF);
    window.location.assign("frontpage.html");
  } else {
    alert("Senha incorreta.");
  }
}
