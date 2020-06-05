const AssistantV1 = require("ibm-watson/assistant/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");

const assistant = new AssistantV1({
  url: "https://gateway.watsonplatform.net/assistant/api",
  version: "2020-01-04",
  authenticator: new IamAuthenticator({
    apikey: "a9RDPzt2J9XrRwQMbuxhEzJriZFKVUemuvbTMyniXOG0",
  }),
});

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "floaNaAwVlB9e3zaEtD5zg3YZ0trdaGYoMHPfwKvy0hE",
  }),
  url: "https://stream.watsonplatform.net/text-to-speech/api/",
});

module.exports = { assistant , textToSpeech };
