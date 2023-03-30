const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/login", (req, res, next) => {
  res.send(
    '<form action="/" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" method="POST"><input id="username" type="text" name="username" placeholder="User Name"><button type="submit">Login</button></form>'
  );
});

app.use("/", (req, res, next) => {
  res.send(
    '<form onSubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)" action="/message" method="POST"><input id="message" type="text" name="message" placeholder="Message"><input id="username" type="hidden" name="username"><button type="submit">Send Message</button></form>'
  );
});

app.use("/message", (req, res, next) => {
  console.log(req.body);
  fs.appendFile(
    "message.txt",
    ` ${req.body.username}:${req.body.message}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.listen(4000);
