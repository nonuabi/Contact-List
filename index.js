const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./confg/monogoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function (req, res) {
  //fetch the data
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "Contacts List",
      contact_list: contacts
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs"
  });
});

app.post("/create-contact", function (req, res) {
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("************** ", newContact);
      return res.redirect("back");
    }
  );
});

//for deleting a contact
app.get("/delete-contact", function (req, res) {
  //get the id from query in the url
  let id = req.query.id;
  //find the contact in the database using id and delete it
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server ", err);
    return;
  }
  console.log("Yup! My Express Server is running on Port: ", port);
});
