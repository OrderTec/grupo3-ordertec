var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ibmdb = require("ibm_db");
let connStr =
  "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=znq46101;PWD=7hwh1gp76cdz^4qn;";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var ibmWatsonRouter = require("./routes/ibmWatson");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ibmWatson", ibmWatsonRouter);
app.use("/users", usersRouter);

app.get("/usuario", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return response.json({ success: -1, message: err });
    }
    conn.query("SELECT * FROM USUARIO", function (err, data) {
      if (err) {
        return response.json({ success: -1, message: err });
      }
      conn.close(function () {
        return response.json(data);
      });
    });
  });
});

app.get("/usuario/:cpf?", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return response.json({ success: -1, message: err });
    }
    conn.query(
      "SELECT * FROM USUARIO WHERE CPF= " + parseInt(request.params.cpf) + ";",
      function (err, data) {
        if (err) {
          return response.json({ success: -1, message: err });
        }
        conn.close(function () {
          return response.json(data);
        });
      }
    );
  });
});

app.post("/estoque", function (req, res) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return res.json({ success: -1, message: err });
    }
    const produto = req.body.PRODUTO;
    const quantidade = req.body.QUANTIDADE;
    const valor = req.body.VALOR;
    const cpf = req.body.CPF;
    const codigo = req.body.CODIGO;
    conn.query(
      `INSERT INTO ESTOQUE VALUES (${cpf}, ${codigo}, '${produto}', ${quantidade}, ${valor})`,
      function (err, data) {
        if (err) {
          console.log(err);
        }
        conn.close(function () {
          return res.json({ success: 1, message: "success!" });
        });
      }
    );
  });
});

app.get("/estoque/:cpf?", function (request, response) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return response.json({ success: -1, message: err });
    }
    conn.query(
      "SELECT COD, NOME, QUANTIDADE, VALOR FROM ESTOQUE WHERE USER_CPF= " +
        parseInt(request.params.cpf) +
        " ORDER BY COD;",
      function (err, data) {
        if (err) {
          return response.json({ success: -1, message: err });
        }
        conn.close(function () {
          return response.json(data);
        });
      }
    );
  });
});

app.delete("/estoque", function (req, res) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return res.json({ success: -1, message: err });
    }
    const cpf = req.body.USER_CPF;
    const cod = req.body.COD;
    conn.query(
      `DELETE FROM ESTOQUE WHERE USER_CPF= ${cpf} AND COD= ${cod}`,
      function (err, data) {
        if (err) {
          console.log(err);
        }
        conn.close(function () {
          return res.json({ success: 1, message: "success!" });
        });
      }
    );
  });
});

app.post("/signin", function (req, res) {
  ibmdb.open(connStr, function (err, conn) {
    if (err) {
      return res.json({ success: -1, message: err });
    }
    const name = req.body.NAME;
    const email = req.body.EMAIL;
    const password = req.body.PASSWORD;
    const cpf = req.body.CPF;
    conn.query(
      `INSERT INTO USUARIO VALUES (${cpf}, '${name}', '${password}', '${email}')`,
      function (err, data) {
        if (err) {
          console.log(err);
        }
        conn.close(function () {
          return res.json({ success: 1, message: "success!" });
        });
      }
    );
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
