const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET   ;

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { Rollno: user.Rollno, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // Access token valid for 15 minutes
  );

  const refreshToken = jwt.sign(
    { Rollno: user.Rollno, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Refresh token valid for 7 days
  );

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
