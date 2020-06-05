var express = require("express");
var router = express.Router();
const ibmWatson = require("../lib/ibmWatsonCredentials");
var multer = require("multer");
var upload = multer();

router.get("/textToSpeech", async (req, res, next) => {
  try {
    var params = {
      text: req.query.text,
      accept: "audio/mp3",
      voice: "pt-BR_IsabelaVoice",
    };
    const { result } = await ibmWatson.textToSpeech.synthesize(params);
    result.on("response", (response) => {
      response.headers["content-disposition"] = `attachment;
      filename=transcript.audio%2Fmp3`;
    });
    result.on("error", next);
    result.pipe(res);
  } catch (error) {
    res.send(error);
  }
});

router.post("/assistant", function (req, res, next) {
  var { text, contextDialog } = req.body;
  context = JSON.parse(contextDialog);
  const params = {
    input: { text },
    workspaceId: "13a3dcd4-08a8-4acc-b8f7-2784f6f9b6ab",
    context,
  };

  ibmWatson.assistant.message(params, function (err, response) {
    if (err) res.json({ status: "ERRO", data: err.toString() });
    else res.json({ status: "OK", data: response });
  });
});

module.exports = router;
