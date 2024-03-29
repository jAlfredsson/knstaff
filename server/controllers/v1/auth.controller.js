import User from '@models/User'
import PasswordReset from '@models/PasswordReset'
import Bcrypt from 'bcryptjs'
import axios from 'axios'

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        if (user.comparePasswords(password)) {
            console.log('201 login success')
            const token = user.generateToken()
            return res.status(201).json({
                user,
                token
            })
        }
    }
    console.log('400 login failure')
    return res.status(400).json({
        email: 'These credentials does not match'
    })
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateToken()

    return res.status(201).json({ user, token })
}

const forgotPassword = async (req, res) => {
    await req.user.forgotPassword()

    return res.json({ message: 'Password reset link set' })
    return res.status(400).json({
        email: 'No account registered on that email'
    })
}

const resetPassword = async (req, res) => {
    const { user } = req
    await User.findOneAndUpdate(
        {
            email: user.email
        },
        {
            password: Bcrypt.hashSync(req.body.password)
        }
    )

    await PasswordReset.findOneAndDelete({
        email: user.email
    })

    return res.json({
        message: 'Password reset successful'
    })
}

const emailConfirm = async (req, res) => {
  const user = await User.findOneAndUpdate({
    email: req.user.email
  }, {
    emailConfirmedAt: new Date(),
    emailConfirmCode: null,
  }, {new: true})

const token = user.generateToken()

return res.json({
  user,
  token
})
}

const resendEmailConfirm = async (req, res) => {
  if(!req.user.emailConfirmedAt){
    await req.user.sendEmailConfirmation()
  }

  return res.json({
    message: 'Email confirm sent.'
    //Detta är väl egentligen inte riktigt??
  })
}

const offers = async (req, res) => {
  let time = new Date().getTime()
  // return res.status(401).json({})
  try {
    const gigs = await axios.post('https://script.google.com/macros/s/AKfycbzPXYMpHP3KKPP-vroYaUBav_8Px5yZ3FTAb1lOlcLfGWTt5Q/exec', {test: true})
    console.log('time ->', (new Date().getTime() - time) / 1000);
    return res.status(201).json([{name: gigs.data}])
  } catch (err) {
    return res.status(201).json([{name: 'Britney'}])
  }
}

export default {
    offers,
    login,
    register,
    forgotPassword,
    resetPassword,
    emailConfirm,
    resendEmailConfirm,
}
