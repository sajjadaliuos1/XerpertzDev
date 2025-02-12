const express = require("express");
const path = require("path"); // Required for image path handling
const Home = require("../models/Home"); // Ensure correct import
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
///////Home details///////////
// Ensure this is correctly imported

// Get all homepage data
router.get("/homedetails", verifyToken, async (req, res) => {
    try {
        const homepageData = await Home.find(); // Ensure the correct model name is used

        if (!homepageData.length) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json(homepageData);
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
///////get image/////
router.get("/img/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Home.findById(id);

    if (!image) {
      return res.status(404).json({ message: "No image found" });
    }

    // ✅ Ensure correct image path
    const imagePath = path.join(__dirname, "../../public/assets", image.image);
    
    // ✅ Check if file exists before sending
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
    await Home.deleteOne({ _id: req.params.id });
    res.json({ message: "HomeData deleted successfully" });
});
//////get one record HomeData Api for Updation////
router.get("/gethome/:id", verifyToken,async (req, resp) => {
  try {
      const homeId = req.params.id;
      
      if (!homeId || homeId === "undefined") {
          return resp.status(400).send({ error: "Invalid Home ID" });
      }

      // Ensure it's a valid ObjectId before querying
      const result = await Home.findOne({ _id: homeId });

      if (result) {
          resp.send(result);
      } else {
          resp.status(404).send({ result: "Home not found." });
      }
  } catch (error) {
      console.error("Error in fetching Home:", error);
      resp.status(500).send({ error: "Server error" });
  }
});
////// HomeData Api for Updation////
router.put("/updatehome/:id", verifyToken, upload.single("image"), async (req, res) => {
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
