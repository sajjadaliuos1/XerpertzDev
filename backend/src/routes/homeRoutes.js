const express = require("express");
const path = require("path"); // Required for image path handling
const Home = require("../models/Home");
const About = require("../models/About"); 
const Services = require("../models/Services");
const Portfolio = require("../models/Portfolio");
const Domain = require('../models/Domain');
const Team = require('../models/Team');  // Ensure correct import
const upload = require("../middleware/upload");
const fs = require("fs"); 
const router = express.Router();
const { verifyToken } = require("../middleware/JwtToken");

// ✅ Add Home Content
router.post("/addhome", upload.single("image"), async (req, res) => {
  try {
    console.log("Received File:", req.file); // Debugging

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image!" });
    }

    const { category, title, paragraph, description } = req.body;
    if (!category || !title || !paragraph || !description) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const home = new Home({
      category,
      title,
      paragraph,
      description,
      image: `${req.file.filename}`, 
    });

    await home.save();
    res.status(201).json({ message: "Content added successfully!" });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
///////Pages details///////////


// Get all Pagesdetails data
router.get("/Pagesdetails", verifyToken, async (req, res) => {
  try {
      // Fetch data from all collections
      const homepageData = await Home.find(); 
      const aboutPageData = await About.find(); 
      const servicesPageData = await Services.find();
      const portfoliopageData = await Portfolio.find(); // Fetch data from Portfolio collection
      const teamData = await Team.find(); 
      const domainpageData = await Domain.find(); 
      // Check if all collections have data
      if (!homepageData.length && !aboutPageData.length && !servicesPageData.length && !portfoliopageData.length && 
        !teamData.length,!domainpageData.length) {
          return res.status(404).json({ message: "No data found" });
      }

      // Send combined response
      res.status(200).json({
          homepage: homepageData,
          aboutpage: aboutPageData,
          servicespage: servicesPageData,
          portfoliopage: portfoliopageData,
          teampage:teamData,
          domainpage:domainpageData
      });
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


///////get image/////
router.get("/img/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check for image in different collections
    let imageRecord =
      (await Home.findById(id)) ||
      (await About.findById(id)) ||
      (await Services.findById(id)) ||
      (await Portfolio.findById(id))||  // Now checking Portfolio table
      (await Team.findById(id));
    if (!imageRecord || !imageRecord.image) {
      return res.status(404).json({ message: "No image found" });
    }

    // Construct the correct image path
    const imagePath = path.join(__dirname, "../../public/assets", imageRecord.image);

    // Check if file exists before sending
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image file not found" });
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Unable to fetch image" });
  }
});
//////Delete Home data Api
router.delete("/home/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Try deleting from each collection
    let deletedData =
      (await Home.findByIdAndDelete(id)) ||
      (await About.findByIdAndDelete(id)) ||
      (await Services.findByIdAndDelete(id)) ||
      (await Portfolio.findByIdAndDelete(id)) ||  // Checking Portfolio table
      (await Team.findByIdAndDelete(id)) ||  // 
      (await Domain.findByIdAndDelete(id));  // Corrected this line

    // If no record was found in any collection
    if (!deletedData) {
      return res.status(404).json({ message: "No record found to delete" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Unable to delete data" });
  }
});



//////get one record HomeData Api for Updation////
router.get("/gethome/:id", verifyToken, async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return resp.status(400).json({ error: "Invalid ID" });
    }

    console.log("Searching for ID:", id);

    let result =
      (await Home.findById(id)) ||
      (await About.findById(id)) ||
      (await Services.findById(id)) ||
      (await Portfolio.findById(id)) ||
      (await Domain.findById(id)) ||
      (await Team.findById(id))||  
      (await Domain.findById(id));

    if (!result) {
      console.log("No record found in any collection.");
      return resp.status(404).json({ error: "Record not found" });
    }

    console.log("Data found:", result);
    resp.status(200).json(result);
  } catch (error) {
    console.error("Error fetching record:", error);
    resp.status(500).json({ error: "Server error" });
  }
});



////// HomeData Api for Updation////
router.put("/updatehome/:id",  upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph, description, category } = req.body;
    let updateData = { title, paragraph, description, category };

    if (req.file) {
      updateData.image = `../../public/assets/${req.file.filename}`;
    }

    const updatedHome = await Home.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedHome) {
      return res.status(404).json({ error: "Home not found" });
    }

    res.json({ message: "Home updated successfully", home: updatedHome });
  } catch (error) {
    res.status(500).json({ error: "Failed to update home" });
  }
});
module.exports = router;
