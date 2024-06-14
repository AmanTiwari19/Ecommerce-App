import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    console.log("abhi require sign in ke andar hai api call ho chuki");
    console.log(req.headers.authorization);
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log("teri maki");
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      console.log("checked");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
