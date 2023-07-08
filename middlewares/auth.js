import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const isAuthenticated = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(authHeader, "auth data");
  // console.log(req.headers, "req.headers");
  if (authHeader === "bearer null" || authHeader === "bearer undefined")
    return next(CustomErrorHandler.unAuthorized());

  try {
    // const jwtToken = authHeader?.split(" ")[1];

    let jwtToken;
    if (authHeader) {
      jwtToken = authHeader.split(" ")[1];
    }

    if (!jwtToken) return next(CustomErrorHandler.unAuthorized());

    const { _id } = await JwtService.verify(jwtToken);
    const user = {
      _id,
    };
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.unAuthorized());
  }
};
