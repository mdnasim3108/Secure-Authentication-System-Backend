const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "qazwsxplmokn", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    res.json({ message: "Token is valid", user: req.user });
  });
};
