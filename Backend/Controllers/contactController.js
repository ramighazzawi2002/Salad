const contactModel = require("../Models/contactModel");

class contactController {
  async getContacts(req, res) {
    try {
      const contacts = await contactModel.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }

  async postContacts(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newContact = new contactModel({
        name,
        email,
        message,
      });

      await newContact.save();

      res
        .status(201)
        .json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
}

module.exports = new contactController();
