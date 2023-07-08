import Joi from "joi";
import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";

const registerController = {
  async register(req, res, next) {
    // console.log(req.body, "new data");
    // const registerSchema = Joi.object({
    //   username: Joi.string().min(3).max(18).required(),
    //   // password: Joi.string()
    //   //   .pattern(new RegExp(`^[a-zA-Z0-9]{3,12}$`))
    //   //   .required(),
    //   password: Joi.string().min(6).max(20).required(),
    // });
    // const { error } = registerSchema.validate(req.body);
    // if (error) {
    //   return next(error);
    // }

    // check if user is in the database already
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }
    // logic to store in database
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // prepare the model

    const user = new User({
      username,
      password: hashedPassword,
    });

    let access_token;
    // let refresh_token;
    try {
      const result = await user.save();
      console.log(result);

      // Token
      access_token = JwtService.sign({ _id: result._id, role: result.role });
      // refresh_token = JwtService.sign(
      //   { _id: result._id, role: result.role },
      //   "1y",
      //   REFRESH_SECRET
      // );
      // database whitelist
      // await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }
    res.json({ "access token": access_token });
    // res.json({ msge: "Hello from Express" });
  },
};

export default registerController;
