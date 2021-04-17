const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var contactList = [
  {
    name: "Abhishek",
    phone: "1111111111",
  },
  {
    name: "Tony Stark",
    phone: "2222222222",
  },
  {
    name: "deepak",
    phone: "3333333333",
  },
];

app.get("/", function (req, res) {
  return res.render("home", {
    title: "Contact List!",
    contact_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  return res.redirect("/practice");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server ", err);
    return;
  }
  console.log("Yup! My Express Server is running on Port: ", port);
});
