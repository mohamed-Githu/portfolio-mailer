const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

app.use(express.json());

app.post("/api/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: name,
    text: `${message} \n\nFrom: ${email}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "failed",
        data: {
          err,
        },
      });
    } else {
      res.status(200).send({
        status: "success",
        data: data,
      });
    }
  });
});

app.listen(process.env.PORT || 5000);
