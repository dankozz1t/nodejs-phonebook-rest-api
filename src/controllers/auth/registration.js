const { HttpCode } = require("../../utils");
const AuthService = require("../../service/auth");
const authService = new AuthService();
const { v4: uuidv4 } = require("uuid");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const isUserExist = await authService.isUserExist(email);

  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  const verificationToken = uuidv4();
  const data = await authService.create({ email, password, verificationToken });

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data,
  });
};

module.exports = registration;
