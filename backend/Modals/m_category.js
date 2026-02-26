import express from 'express'
import {
    getCategories,
    getCategory,
    deleteCategory,
    insertCategory,
    updateCategory
} from '../Controllers/category.js'

const route_category = express.Router()

route_category.get('/', getCategories)
route_category.get('/:id', getCategory)
route_category.delete('/:id', deleteCategory)
route_category.post('/', insertCategory)
route_category.put('/:id', updateCategory)

export default route_category