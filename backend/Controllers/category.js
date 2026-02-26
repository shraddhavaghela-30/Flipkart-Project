import {db} from '../db.js'

export const getCategories = (req, res) => {
    const getCategoriesQuery = 'SELECT *, DATE_FORMAT(created_at, "%d-%m-%Y") AS created_at1, DATE_FORMAT(updated_at, "%d-%m-%Y") AS updated_at1 FROM `category`';

    db.query(getCategoriesQuery, (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
};

export const getCategory = (req, res) => {
    const getCategoryQuery = 'SELECT * FROM `category` WHERE `category_id` = ?'

    db.query(getCategoryQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data[0])
        }
    })
};

export const deleteCategory = (req, res) => {
    const deleteCategoryQuery = 'DELETE FROM `category` WHERE `category_id` = ?'

    db.query(deleteCategoryQuery, [req.params.id], (err,data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data deleted successfully")
        }
    })
}

export const insertCategory = (req, res) => {
    const insertCategoryQuery = 'INSERT INTO `category`(`category_name`, `status`, `created_at`, `entry_by`) VALUES (?)'

    const value = [
        req.body.category_name,
        req.body.status,
        new Date(),
        req.body.entry_by
    ]

    db.query(insertCategoryQuery , [value], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("data inserted successfully")
        }
    })
};

export const updateCategory = (req, res) => {
        const updateCategoryQuery = 'UPDATE `category` SET `category_name`= ?, `status` = ?, `updated_at`= ?, `update_by`= ? WHERE `category_id`= ?'

        db.query("SELECT * FROM `category` WHERE `category_id` = ?", [req.params.id], (err, data) => {
            if(err){
                return res.status(500).json(err)
            }
            if(data.length === 0){
                return res.status(400).json("not found")
            }
            const existingCategory = data[0]

            const value = [
            req.body.category_name || existingCategory.category_name,
            req.body.status,
            new Date(),
            req.body.update_by
            ]

            db.query(updateCategoryQuery, [...value, req.params.id] , (err, data) => {
                if(err){
                    return res.json(err)
                }
                else{
                    return res.json("data updated successfully")
                }
            })
    })

}