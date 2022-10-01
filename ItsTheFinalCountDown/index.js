// import fetch from 'node-fetch';
// import { createRequire } from 'module'
// const options = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"patient": 'Boop'})
//     }

//     fetch('https://us-central1-picohack-2022.cloudfunctions.net/panic', options)
//     .then(response => {
//         console.log(response);
//         return response.json();
//     }).then(data => {
//         // Work with JSON data here
//         console.log(data);
//     }).catch(err => {
//         // Do something for an error here
//         console.log("Error Reading data " + err);
//     });



let axios = require("axios");
var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 
var nodemailer = require('nodemailer');
// const { MailSlurp } = require("mailslurp-client");
// const mailslurp = new MailSlurp({ apiKey: "4c0e010e45ee4e3de8f4a9681a866c2502e089fbd33705031422fdc9ec6390de" });
var serialPort = new SerialPort({
  path: "COM5",
  baudRate: 9600,
  AutoOn: false
});

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
      data = hexToUtf8(data);
      let patientID = data.substring(6,10);
      if (data.substring(0,6) == "Alert:") {
      axios.post('https://us-central1-picohack-2022.cloudfunctions.net/panic', {
          patient: patientID
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
      // sendEmail(patientID);
   
    }

      

    });
  });

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   auth: {
  //       user: 'garth.wehner@ethereal.email',
  //       pass: process.env.pass
  //   }
  // });
// async function sendEmail(patientID) {
//   const sentEmail = await mailslurp.inboxController.sendEmailAndConfirm(
//     "8eb0b630-2807-4bc6-abe6-d60817286675",
//     {
//       to: ["callumgilchrist2121@gmail.com"],
//       subject: "FIRST AID NEEDED",
//       body: `Patient ${patientID} has fallen Down`,
//     },
//   );
// }

 const convert = (from, to) => str => Buffer.from(str, from).toString(to);
 const utf8ToHex = convert('utf8', 'hex');
 const hexToUtf8 = convert('hex', 'utf8');