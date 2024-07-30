const crypto = require('crypto');
const dotenv = require('dotenv')
dotenv.config()
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_KEY,'hex');
const iv = Buffer.from(process.env.IV,'hex');
//const text1 = '29b30b7f90bf8eddaa2c37803a8f52c2'
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    content: encrypted
  };
};

const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

//console.log(decrypt(text1))
module.exports = { encrypt, decrypt };
