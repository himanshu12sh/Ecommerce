import User from '../model/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ success: true, msg: 'User created successfully' , user: newUser });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({ success: false, msg: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, msg: 'Invalid password' });
    }

    const token = jwt.sign(
      { _id: checkUser._id, email: checkUser.email, role: checkUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      success: true,
      msg: 'Login successful',
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role
      }
    });

  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};


export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting its maxAge to 0
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 0
    });

    return res.status(200).json({ success: true, msg: 'Logout successful' });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");
    req.user = decoded; // or fetch full user if needed
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role
      }
    });
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};