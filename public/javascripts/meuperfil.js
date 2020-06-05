function carregaPerfil() {
  var cpf = localStorage.getItem("cpf");
  var url = `/usuario/${cpf}`;
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.send();
  var jsonresponse = xhr.responseText;
  var obj = JSON.parse(jsonresponse);
  document.getElementById("nome").innerHTML = `Nome: ${obj[0].NOME}`;
  document.getElementById("email").innerHTML = `E-mail: ${obj[0].EMAIL}`;
  document.getElementById("cpf").innerHTML = `CPF: ${obj[0].CPF}`;
  document.getElementById("fieldset").className = "show";
}
