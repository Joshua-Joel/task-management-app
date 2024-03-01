const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const token = req.cookies.token;
//   console.log(req.cookies.token);

//   const secret = process.env.JWT_SECRET_KEY;
//   if (!token) {
//     console.log("middle");
//     return res.status(401).json({ error: "Access denied, token not provided" });
//   }

//   jwt.verify(token, secret, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid token" });
//     }

//     req.user = user;
//     next();
//   });
// }
const authenticateToken = (role) => {
    console.log("middle");
  return async (req, res, next) => {
    
    const token = req.cookies.token;
    console.log(req.cookies.token);

    const secret = process.env.JWT_SECRET_KEY;
    if (!token) {
      console.log("middle");
      return res
        .status(401)
        .json({ error: "Access denied, token not provided" });
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      else if(role!=="" && user.role !== role ){
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user; 
      next();
    });
  };
};
module.exports = authenticateToken;
