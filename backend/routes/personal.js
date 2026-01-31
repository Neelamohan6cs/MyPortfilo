import e, { Router } from "express";
import Personal from "../colloctions/personalSchema.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const newPersonal = new Personal({ name, email });
    await newPersonal.save();

    res.status(201).json({
      message: "Personal info saved successfully",
      data: newPersonal
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving personal info",
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const personals = await Personal.find();
    res.status(200).json({
      message: "Personal info retrieved successfully",
      data: personals
    });
  }

   catch (error) {
    res.status(500).json({
      message: "Error retrieving personal info",
      error: error.message
    });
  }
});

router.post('/skills', async (req, res) => {
  try {
    const skills = ["react","javascript", "html", "css","app",];

    const updatedPerson = await Personal.findOneAndUpdate(
      {},
      { $set: { skills } },
      { new: true }
    );

    res.json({
      message: "Skills updated successfully",
      data: updatedPerson
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post('/education', async (req, res) => {
  try{
    const educationdata = [{
      college: "Dhanalakshmi Srinivasn college",
      degree: "B.Tech",
      course: "Computer Science",
      from: 2018,
      to: 2022,
    },
    {
      college: "ABC University",
      degree: "M.Tech",
      course: "Information Technology",
      from: 2022,
      to: 2024,
    }
  ]
    const updateEducation = await Personal.findOneAndUpdate(
      {},
      {$set:{ education: educationdata }},
      { new: true ,upsert: true  }
    )
    res.json({
      message: "Education updated successfully",
      data: updateEducation
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/demo',async(req,res)=>{
  try {

    res.send(Personal.find())
    
  } catch (error) {
    
  }
  


})

export default router;
