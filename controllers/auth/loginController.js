import Joi from "joi";
import { User } from "../../models/index.js";
// import { User, RefreshToken } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
// import { REFRESH_SECRET } from "../../config";

const loginController = {
  async login(req, res, next) {
    // Validation
    // console.log(req.body);
    // const loginSchema = Joi.object({
    //   username: Joi.string().min(3).max(18).required(),
    //   password: Joi.string().min(6).max(20).required(),
    // });

    // const { error } = loginSchema.validate(req.body);

    // if (error) {
    //   return next(error);
    // }

    try {
      const user = await User.findOne({ email: req.body.username });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // compare the password
      // const match = await bcrypt.compare(req.body.password, user.password);
      // if (!match) {
      //   return next(CustomErrorHandler.wrongCredentials());
      // }

      // Toekn
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      //   const refresh_token = JwtService.sign(
      //     { _id: user._id, role: user.role },
      //     "1y",
      //     REFRESH_SECRET
      //   );
      // database whitelist
      //   await RefreshToken.create({ token: refresh_token });
      //   res.json({ access_token, refresh_token });
      res.json({ access_token });
    } catch (err) {
      console.log(err, "actual error");
      return next(err);
    }
  },
  //   async logout(req, res, next) {
  //     // validation
  //     const refreshSchema = Joi.object({
  //       refresh_token: Joi.string().required(),
  //     });
  //     const { error } = refreshSchema.validate(req.body);

  //     if (error) {
  //       return next(error);
  //     }

  //     try {
  //       await RefreshToken.deleteOne({ token: req.body.refresh_token });
  //     } catch (err) {
  //       return next(new Error("Something went wrong in the database"));
  //     }
  //     res.json({ status: 1 });
  //   },
};

export default loginController;
