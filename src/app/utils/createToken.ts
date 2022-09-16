import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

export default (user) => {
  return jwt.sign({ id: user._id }, authConfig.secret, {
    expiresIn: 86400
  })
}
