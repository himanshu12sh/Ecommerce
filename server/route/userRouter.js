import express from 'express';
import { authMiddleware, login, logout, register } from '../controller/authController.js';

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router