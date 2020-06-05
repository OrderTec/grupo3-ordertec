var newone = [];
var newtwo = [];
var newthree = [];
var newfour = [];

function verificaCampos() {
  var codigo = document.getElementById("codigo").value;
  var produto = document.getElementById("produto").value;
  var quantidade = document.getElementById("quantidade").value;
  var valor = document.getElementById("valor").value;
  if (produto == "" || quantidade == "" || valor == "" || codigo == "")
    alert("Por favor, preencha todos os campos.");
  else salvaProduto();
}

function salvaProduto() {
  var data = {};
  var nome = document.getElementById("produto").value;
  var defnome = nome.toUpperCase();
  data.CODIGO = document.getElementById("codigo").value;
  data.PRODUTO = defnome;
  data.QUANTIDADE = document.getElementById("quantidade").value;
  data.VALOR = document.getElementById("valor").value;
  data.CPF = localStorage.getItem("cpf");
  var url = "/estoque";
  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(json);
  add();
}


function add() {
  var codigo = document.getElementById("codigo").value;
  var produto = document.getElementById("produto").value;
  var quantidade = document.getElementById("quantidade").value;
  var valor = document.getElementById("valor").value;
  newone.push(produto);
  newtwo.push(quantidade);
  newthree.push(valor);
  newfour.push(codigo);
  document.getElementById("codigo").value = "";
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
  listshow();
}

function pegaEstoque() {
  var cpf = localStorage.getItem("cpf");
  var url = `/estoque/${cpf}`;
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.send();

  var jsonresponse = xhr.responseText;
  if (jsonresponse != "[]") {
    var obj = JSON.parse(jsonresponse);
    mostraEstoque(obj);
  }
}

function mostraEstoque(obj) {
  for (var i = 0; i < obj.length; i++) {
    newone.push(obj[i].NOME);
    newtwo.push(obj[i].QUANTIDADE);
    newthree.push(obj[i].VALOR);
    newfour.push(obj[i].COD);
    listshow();
  }
}

function listshow() {
  var list = "";
  for (var i = 0; i < newone.length; i++) {
    list +=
      "<tr>" +
      `<td id="${i}">` +
      newfour[i] +
      "</td>" +
      "<td>" +
      newone[i] +
      "</td>" +
      "<td>" +
      newtwo[i] +
      "</td>" +
      "<td>" +
      newthree[i] +
      "</td>" +
      "<td>" +
      `<button onclick="del(${i});">Deletar</button>` +
      "</td></tr>";
  }

  if (document.getElementById("produto").value == "Produto") {
    document.getElementById("data").innerHTML = list;
  } else {
    document.getElementById("data").innerHTML = list;
  }
}

function del(dok) {
  var cod = document.getElementById(dok).innerHTML;
  var data = {};
  data.USER_CPF = localStorage.getItem("cpf");
  data.COD = cod;
  var json = JSON.stringify(data);
  var url = `/estoque`;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(json);
  newone.splice(dok, 1);
  newtwo.splice(dok, 1);
  newthree.splice(dok, 1);
  newfour.splice(dok, 1);
  listshow();
}
