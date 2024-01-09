const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email,name,type,gender,city,state, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email,name,type,gender,city,state, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true, userType: user.type });
       next()
    } catch (error) {
      console.error(error);
    }
  };

module.exports.details=async(req,res) => {
    try {
        const email = req.params.email;
        // Fetch user details from the database
        
        const userDetails = await User.findOne({ email });
        // Check if user details were found
        if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Send the user details in the response
        res.status(200).json(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
 module.exports.GetStudentDetails = async (req, res) => {
  try {
    const students = await User.find({ type: "student" });

    // Check if students were found
    if (!students || students.length === 0) {
      console.log("No student details found");
      return res.status(404).json({ message: "No student details found" });
    }


    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateDetails = async (req, res) => {

  const email = req.params.email;

  try {
    const updatedDetails = req.body;
    const updatedStudent = await User.findOneAndUpdate(
      { email: email, type: "student" },
      updatedDetails,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student details updated successfully" });
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// In your AuthController.js or another appropriate file

// Add a new function to get teacher details
module.exports.GetTeacherDetails = async (req, res) => {
  try {
    const teachers = await User.find({ type: "teacher" });
    console.log(teachers);

    // Check if teachers were found
    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No teacher details found" });
    }

    // Send the teacher details in the response
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new function to update teacher details
module.exports.UpdateTeacherDetails = async (req, res) => {
  try {
    const email = req.params.email;
    const updatedDetails = req.body;

    const updatedTeacher = await User.findOneAndUpdate({ email, type: "teacher" }, updatedDetails, { new: true });

    // Check if teacher details were found and updated
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Send the updated teacher details in the response
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error('Error updating teacher details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
