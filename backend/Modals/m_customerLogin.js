import express from 'express'
import { customerLoginFunction } from '../Controllers/customerLogin.js'

const route_customerLogin = express.Router()

route_customerLogin.get('/', customerLoginFunction)

export default route_customerLogin