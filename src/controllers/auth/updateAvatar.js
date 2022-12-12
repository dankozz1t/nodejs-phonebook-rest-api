const { User } = require("../../model");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

require("dotenv").config();

const updateAvatar = async (req, res, next) => {
  const { _id, email } = req.user;
  const { originalname, path: tempPath } = req.file;

  const imageName = `${email}_${originalname}`;

  const newPath = path.join(__dirname, "../../../public/avatars", imageName);
  const avatarURL = `http://${process.env.HOST}:${process.env.PORT}/api/avatars/${imageName}`;

  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250);
    await image.writeAsync(tempPath);
    await fs.rename(tempPath, newPath);

    await User.findOneAndUpdate({ _id }, { avatarURL });

    res.json({
      avatarURL: avatarURL,
    });
  } catch (e) {
    await fs.unlink(tempPath);
    next(e);
  }
};

module.exports = updateAvatar;
