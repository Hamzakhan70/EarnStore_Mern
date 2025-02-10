const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  console.log(user,"user")
  res.status(200).json({
    success: true,
    message: "Authenticated User!",
    user,
  });
});
module.exports = router;
