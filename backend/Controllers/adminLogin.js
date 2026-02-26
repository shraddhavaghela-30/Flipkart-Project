// const db = require("../helper/db");
import { db } from "../db.js";
// const { validationResult } = require("express-validator");
import { validationResult } from "express-validator";

export const getlogin = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: result.array(),
    });
  }

  try {
    const q = "SELECT `admin_id` , `email`, `password` FROM admin WHERE `email` = ? AND `password` = ?";

    const value = [
      req.query.email,
      req.query.password
    ]

    db.query(q, value, (err, data) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Database error",
          error_type: "error",
          data: err.message,
        });
      }

      if (data.length > 0) {
        return res.status(200).json({
          status: 200,
          message: "Login successful",
          error_type: "success",
          admin_id: data[0].admin_id
        });
      } else {
        return res.status(401).json({
          status: 401,
          message: "Invalid email/mobile or password",
          error_type: "error",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      error_type: "error",
      data: error.message,
    });
  }
};

// module.exports = { getlogin };