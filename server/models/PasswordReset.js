import mongoose from 'mongoose'
import config from '@config'
import randomString from 'randomstring'
import Mail from '@fullstackjs/mail'

const PasswordResetSchema = new mongoose.Schema({
    email: String,
    token: String,
    createdAt: Date
})

export default mongoose.model('PasswordReset', PasswordResetSchema)
