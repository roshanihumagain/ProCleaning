const User = require('../models/user.model');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const existingPhone = await User.findByPhone(phone);
    if (existingPhone) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create(name, email, hashedPassword, phone, address, role);

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
