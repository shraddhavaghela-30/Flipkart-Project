import { db } from "../db.js";

export const getAdmins = (req, res) => {
  const getAdminsQuery =
    'SELECT *, DATE_FORMAT(entry_date, "%d-%m-%Y") AS entry_date1, DATE_FORMAT(update_date, "%d-%m-%Y") AS update_date1 FROM `admin`';

  db.query(getAdminsQuery, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

export const getAdmin = (req, res) => {
  const getAdminQuery = "SELECT * FROM `admin` WHERE `admin_id` = ?";

  db.query(getAdminQuery, [req.params.id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0]);
    }
  });
};

export const deleteAdmin = (req, res) => {
    const deleteAdminQuery = 'DELETE FROM `admin` WHERE `admin_id` = ?'

    db.query(deleteAdminQuery, [req.params.id], (err, data) => {
        if(err){
            return res.json(err)
        }
        else{
            return res.json("Data deleted successfully...")
        }
    })
};

export const insertAdmin = (req, res) => {
  const insertAdminQuery = "INSERT INTO `admin`(`image`, `name`, `mobile_no`, `city`, `state`, `address`, `email`, `password`, `entry_date`) VALUES (?)"

  const value = [
    req?.file?.filename || req?.body?.file,
    req.body.name,
    req.body.mobile_no,
    req.body.city,
    req.body.state,
    req.body.address,
    req.body.email,
    req.body.password,
    new Date()
  ];

  db.query(insertAdminQuery, [value], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Data inserted successfully...")
    }
  });
};

export const updateAdmin = (req, res) => {

  const updateAdminQuery =
  "UPDATE `admin` SET `image`=?,`name`=?,`mobile_no`=?,`city`=?,`state`=?,`address`=?,`email`=?,`password`=?,`update_date`=?,`update_by`= ? WHERE `admin_id` = ?"

    db.query("SELECT * FROM `admin` WHERE `admin_id` = ?", [req.params.id], (err, data) => {
      if(err){
        return res.status(500).json(err)
      }
      if(data.length === 0){
        return res.status(400).json("Not Found")
      }
      const existingAdmin = data[0]
          const value =[
          req?.file?.filename || req?.body?.file || existingAdmin.image,
          req?.body?.name || existingAdmin.name,
          req?.body?.mobile_no || existingAdmin.mobile_no,
          req?.body?.city || existingAdmin.city,
          req?.body?.state || existingAdmin.state,
          req?.body?.address || existingAdmin.address,
          req?.body?.email || existingAdmin.email,
          req?.body?.password || existingAdmin.password,
          new Date(),
          req.body.update_by,
      ]

      db.query(updateAdminQuery, [...value, req.params.id], (err,data) => {
          if(err){
              return res.json(err)
          }
          else{
              return res.json("Data updated successfully...")
          }
      })
    })

};

// export const insertAdminPassword = (req, res) => {
//   const insertAdminPasswordQuery = 'INSERT INTO `admin`(`password`) VALUES (?)'

//   const value = [
//     req.body.password
//   ]

//   db.query(insertAdminPasswordQuery, [value], (err, data) => {
//     if(err){
//       return res.json(err)
//     }
//     else{
//       return res.json("password inserted successfully")
//     }
//   })
// }

// export const updateAdminPassword = (req, res) => {
//   const updateAdminPasswordQuery = 'UPDATE `admin` SET `password` = ?,`update_date` =?, `update_by` = ? WHERE `admin_id` = ?'

//   const value = [
//     req.body.password,
//     new Date(),
//     req.body.update_by
//   ]
//   db.query(updateAdminPasswordQuery , [value, req.params.id], (err, data) => {
//     if(err){
//       return res.json(err)
//     }
//     else{
//       return res.json("password updated successfully")
//     }
//   })

// }