const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const checkIfuserExists=require("../utils/checkIfUserExists")
module.exports=async (req, res) => {
    const { to, userName } = req.body;
    const isUserAlreadyExists=await checkIfuserExists(to)
      if(isUserAlreadyExists){
          res.json({error:true,message:"user aleady exists"})
          return
      }
    const OTP = Math.floor(Math.random() * 1000000);
    const msg = {
      to,
      from: "mohamednasim3108@gmail.com",
      subject: "Email verification",
      html: `
              <p>Hello <b>${userName}</b></p>
              <p>Let's complete your verification process.</p>
              <p>Please use the below OTP for Authentication</p>
              <h1>OTP : ${OTP}<h1/>      
        `,
    };
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json({ otp: OTP });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
      });
  }