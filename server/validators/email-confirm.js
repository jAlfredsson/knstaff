import * as Yup from 'yup'
import User from '@models/User'

const EmailConfirmSchema = Yup.object().shape({
    token: Yup.string().required()
})

export default async (req, res, next) => {
    try {
      console.log(req.body)
        await EmailConfirmSchema.validate(req.body)

        const user = await User.findOne({ emailConfirmCode: req.body.token })

        if (!user) {
            throw new Yup.ValidationError(
                'Invalid confirmation code',
                req.body,
                'token'
            )
        }

        req.user = user

        return next()
    } catch (error) {
        res.status(422).json({
            [error.path]: error.message
        })
    }
}
