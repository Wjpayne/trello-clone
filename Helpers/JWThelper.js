
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = async (email, _id) => {
    try {
      const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
        expiresIn: "15d",
      });
  
      await setJWT(token, _id);
      return Promise.resolve(token);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  module.exports = {
      createJWT
  }