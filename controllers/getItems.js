const Items = require("../models/items");
/**
 *
 * @param {page,limit} req.query
 * @returns {array of items,number of items}
 */
module.exports = async (req, res) => {
  try {
    let page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 0;
    let limit = parseInt(req.query.limit) > 5 ? parseInt(req.query.limit) : 5;
    //find all items in database with the requested pages and limits
    console.log(`[+] Requesting page=${page} with limit=${limit} in getItems.js`);
    // Query DB for all items with page number and limit
    // Populate the items with the destinationID
    let getItems = await Items.find({ isAvailable: "true" })
      .limit(limit)
      .skip(limit * page)
      .populate("destinationID", "-__v -updatedAt -createdAt")
      .select("-__v -updatedAt -createdAt");
    console.log("[+] Sending Items in response ");
    return res.status(200).json({
      message: "Success",
      api: { items: getItems, length: getItems.length },
    });
  } catch (error) {
    console.log("[-] Error in getItems.js ");
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
