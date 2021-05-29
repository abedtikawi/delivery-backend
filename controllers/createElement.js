const pool = require("../database/db");

module.exports = async (req, res) => {
  try {
    // create Location
    // insert item with the preceeding location id

    const locatedAt = `INSERT INTO locations(user_id,address,city,street,description,createdat) 
    VALUES (8,'${req.body.locatedAt_address}','${req.body.locatedAt_city}','${req.body.locatedAt_street}','${req.body.locatedAt_description}',CURRENT_TIMESTAMP);`;
    
    const deliveryLocation = `INSERT INTO locations(user_id,address,city,street,description,createdat) 
    VALUES (8,'${req.body.deliveryLocation_address}','${req.body.deliveryLocation_city}','${req.body.deliveryLocation_street}','${req.body.deliveryLocation_description}',CURRENT_TIMESTAMP);`;
    
    const sql = `INSERT INTO items(user_id,item_name,price,locatedat,deliveryLocation,createdat) 
    VALUES (8,'${req.body.itemName}',${req.body.price},
    ${locatedAt.id},${deliveryLocation.id},CURRENT_TIMESTAMP);`;
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
