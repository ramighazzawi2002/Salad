const ChefRequest = require("../Models/chefRequestModel");

const getChefRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalChef = await ChefRequest.countDocuments({
      isApproved: false,
      isDeleted: false,
    });
    const chefRequest = await ChefRequest.find({
      isApproved: false,
      isDeleted: false,
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      chefRequest,
      currentPage: page,
      totalPages: Math.ceil(totalChef / limit),
      totalChef,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// POST /chef-request
const createChefRequest = async (req, res) => {
  try {
    const user_Id = req.cookies.user_id;

    console.log(user_Id);
    const { name, yearsOfExperience, culinarySpecialties } = req.body;

    // Validate the required fields
    if (!user_Id || !name || !yearsOfExperience || !culinarySpecialties) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChefRequest = new ChefRequest({
      user_Id,
      name,
      yearsOfExperience,
      culinarySpecialties,
    });

    await newChefRequest.save();
    res.status(201).json({
      message: "Chef request created successfully",
      data: newChefRequest,
    });
  } catch (error) {
    console.error("Error creating chef request:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const changeChefRequestToApproved = async (req, res) => {
  try {
    const { id } = req.params;
    const chefRequest = await ChefRequest.findById(id);
    if (!chefRequest) {
      return res.status(404).json({ message: "Chef request not found" });
    }
    chefRequest.isApproved = true;
    await chefRequest.save();
    res.status(200).json({
      message: "Chef request approved successfully",
      data: chefRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteChefRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const chefRequest = await ChefRequest.findById(id);
    if (!chefRequest) {
      return res.status(404).json({ message: "Chef request not found" });
    }
    chefRequest.isDeleted = true;
    await chefRequest.save();
    res.status(200).json({ message: "Chef request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createChefRequest,
  getChefRequest,
  changeChefRequestToApproved,
  deleteChefRequest,
};
