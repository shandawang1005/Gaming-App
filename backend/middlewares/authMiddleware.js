const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader); // 打印 Authorization 头

  if (!authHeader) {
    console.error("No Authorization Header");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token Extracted:", token); // 打印提取的 Token

  if (!token) {
    console.error("Invalid Token Format");
    return res.status(401).json({ error: "Access denied. Invalid token format." });
  }
  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ error: "Token has been logged out." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "randomKey");
    console.log("Decoded Token:", decoded); // 打印解码后的 Token
    req.user = decoded; // 将解码后的用户信息附加到 req.user
    next(); // 继续到下一个中间件或路由
  } catch (error) {
    console.error("Token validation error:", error.message); // 打印错误信息
    return res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticate;
