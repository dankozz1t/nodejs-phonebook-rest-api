const { Router } = require("express");
const { authControllers } = require("../../../controllers");
const {
  verificationAgain,
  verification,
} = require("../../../controllers/auth/email");
const { registration, login, logout, currentUser, updateAvatar } =
  authControllers;
const { guard, userValidation, upload } = require("../../../middleware");

const authRouter = Router();

authRouter.route("/signup").post(userValidation, registration);
authRouter.route("/login").post(userValidation, login);
authRouter.route("/logout").post(guard, logout);
authRouter.route("/current").post(currentUser);
authRouter.route("/avatar").patch(guard, upload.single("avatar"), updateAvatar);

authRouter.route("/verify/:verificationToken").get(verification);

authRouter.route("/verify").post(verificationAgain);

module.exports = authRouter;
