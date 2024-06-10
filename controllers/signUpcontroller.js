const Users=require("../models/user.model")
const bcrypt=require("bcryptjs")
module.exports=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = new Users({ username, email, password: hashedPassword });
      const updatedUsers = await data.save();
      res.json(updatedUsers);
    } catch (err) {
      res.json(err);
    }
  }