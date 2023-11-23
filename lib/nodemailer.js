const nodemailer = require("nodemailer")
const { ValidationError } = require("webpack")
require("dotenv").config()

exports.randomizerInt = function randomizerInt(){
  let generatedNumber = Math.ceil(Math.random() * 1000) + 1000 
  process.env.VERIFICATION_PIN = generatedNumber
  return new Promise(function(resolve,reject){
    resolve(generatedNumber)
  })
}

// this will send the OTP
exports.sendOTP = function sendOTP(email){
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      host : "smtp.gmail.com", 
      secure : true,
      auth : {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD
      }
  });

  mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject:`GitChat: OTP VERIFICATION`,
      // design a better template for Otp verification menu in the gmail using back ticks
      html:     
      `<body style="padding:0;margin:0;width:100%;height:auto;box-sizing: border-box;">
        <div style="border-radius:0.5rem;padding: 0.5rem;background-image: linear-gradient(rgba(0,0,255,0.2),rgba(0,0,0,1)),url('../Images/tech-meeting-flatlay.jpg');background-size: cover;color:blue;box-sizing:border-box;margin:1rem;border-radius: 1rem;display:flex;justify-content:center;align-items:center;flex-direction:column;width:98%;height:94vh;">
            <div style="text-align:center;border-radius:0.5rem;padding: 0.5rem;width: auto;height:auto;background-color: rgba(255,255,255,0.4)">
              <h1 style="color:blue">Hi, hope you are good</h1>
              <h2 style="color:blue">In order to verify it's you please enter the pin below</h2>
              <h2 style="color:green">${process.env.VERIFICATION_PIN}</h2>
              <p style="font-weight:800">Have a nice one. Thank you</p>
              <p style="font-weight:800">The gitChat team</p>
            </div>
        </div>
      </body>
      `
  };  
  return new Promise(function(resolve,reject){  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          reject('internal server error')
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log("He should check his email for veriification")
          resolve(info.response)
        }
      });
  })
}


// will be sent from react by both the confirm signup and the forgot password
// takes the user object and OTP pin parameters
// this function called before the signUp or the forgot password methods.
// has a callback to ensure the user is well informed if he provided the wrong OTP
exports.otpVerifier = function otpVerifier(OTP){
  // incorrect otp
  return new Promise(function(resolve,reject){
    if(OTP != process.env.VERIFICATION_PIN){
      resolve("incorrect")
    }
    else{
      resolve("redirect")
    }
  })
}