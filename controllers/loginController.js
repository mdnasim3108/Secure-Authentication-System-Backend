const Users=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
module.exports=async (req, res) => {
    try {
      let { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        res.json({
          error: true,
          message: "User doesn't exist",
        });
        return;
      }
      const isPasswordSame = bcrypt.compare(password, user.password);
      if (isPasswordSame) {
        const token = jwt.sign({ userId: user.id }, "qazwsxplmokn", {
          expiresIn: "5h",
        });
        res.json({
          error: false,
          token,
          user,
        });
      } else {
        res.json({
          error: true,
          message: "User doesn't exist",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }