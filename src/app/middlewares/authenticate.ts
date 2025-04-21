import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // If you're using JWT

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify the token using your secret key
    req.user = decoded; // Attach user data (decoded) to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
