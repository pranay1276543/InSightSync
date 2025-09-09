import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import { aai } from "../config/assembly.js";
import cohere from "../config/cohere.js";

export const checkUpload = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ success: false, message: "File not uploaded" });
  }

  try {
    
    const filePath = path.resolve(req.file.path);
    console.log("Absolute file path:", filePath);


 
    const cloudRes = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

   
    fs.unlinkSync(filePath);

    const transcript = await aai.transcripts.transcribe({
      audio_url: cloudRes.secure_url,
    });

 
    const response = await cohere.chat({
      model: "command-r-plus", 
      messages: [
        { role: "system", content: "You are an assistant that summarizes transcripts into bullet points." },
        { role: "user", content: `Create a detailed summary of the following transcript.Include main ideas, important insights, and examples. Write in multiple paragraphs,not just short bullet points. Transcript\n\n${transcript.text}` },
      ],
    });

    const summary = response.message.content[0].text;

    return res.json({
      success: true,
      message: "File processed successfully",
      cloudinaryUrl: cloudRes.secure_url,
      transcript: summary
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
