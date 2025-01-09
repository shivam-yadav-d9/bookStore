import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.log("Password before hashing:", password);
        const hashPassword = await bcryptjs.hash(password,10);
console.log("Hashed Password:", hashPassword);
        const createdUser =new User({
            fullname:fullname,
            email:email,
            password:hashPassword,
        });
        await createdUser.save();
        res.status(201).json({ message: "User created successfully",user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            email:createdUser.email,
        } });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default User;

export const login = async(req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email});
        const isMatch  = await bcryptjs.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid user or password"});

        }else{
            res.status(200).json({
                message:"Login successful",
                user:{
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                },

            })
        }
    }catch(error){
        console.log("Error: "+ error.message);
        res.status(500).json({message: "Internall server error"});
        
    }
}
