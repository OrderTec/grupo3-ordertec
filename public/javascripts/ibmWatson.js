var contextDialog = "{}";

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("chat").innerHTML = "";
}


function sendMessageToAssistant() {
  var textMessage = document.chatForm.textMessage.value;
  chat = document.getElementById("chat");

  if (textMessage === undefined || textMessage === "") textMessage = "";
  else chat.innerHTML += `<p> Você --> ` + textMessage + "</p><br>";

  document.chatForm.textMessage.value = "";

  $.post(
    "http://localhost:3000/ibmWatson/assistant",
    { text: textMessage, contextDialog },
    function (returnedData, statusRequest) {
      if (returnedData.status === "ERRO") alert(returnedData.data);
      else {
        chat.innerHTML +=
          `<p style="color:#41df9a;">` + returnedData.data.result.output.text + "</p><br>";
        contextDialog = JSON.stringify(returnedData.data.result.context);
        if(navigator.userAgent.indexOf("Chrome") === -1 || $("#muteButton").attr("class").match("off"))
          sendTextToSpeech(JSON.stringify(returnedData.data.result.output.text));
      }
    }
  ).fail(function (returnedData) {
    alert("Erro: " + returnedData.status + " " + returnedData.statusText);
  });
}

$(document).keypress(function (event) {
  if (event.which == "13") {
    event.preventDefault();
    sendMessageToAssistant();
  }
});



$(document).ready(function(){
  if(navigator.userAgent.indexOf("Chrome") != -1){
    document.getElementById("muteButton").setAttribute("style", "font-size:40px;");
  }
  sendMessageToAssistant();
});

function allowAutoPlay(){
  $("#muteButton").attr("class", "fas fa-volume-off");
}

function sendTextToSpeech(textMessage){
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("type", "audio/ogg;codecs=opus");
  audioElement.setAttribute("src", "/ibmWatson/textToSpeech?text=" + textMessage);
  audioElement.play();
}
