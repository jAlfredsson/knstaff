import config from '@config'
import jwt from 'jsonwebtoken'
import User from '@models/User'

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, config.jwtSecret)
    const user = await User.findById(data.id)
    if(!user){
      throw new Error()
    }
    req.user = user;
    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthenticated'
    })
  }
}
