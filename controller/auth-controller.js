const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.send('API started with auth-router');
    } catch (error) {
        console.error('Error in home:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Registration
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const saltRounds = 10; // Increase the number of salt rounds for better security but it make this complex and time consuming
        const hash_password = await bcrypt.hash(password, saltRounds);

        const userCreated = await User.create({ username, email, phone, password: hash_password });

        res.status(201).json({ msg: "registration complete",userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (error) {
        console.error('Error in Registration:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


//login

const login = async(req,res)=>{
    try {

        const {email, password} = req.body;
        const userExist = await User.findOne({email})
        console.log(userExist);

        if (!userExist) {
            return res.status(400).json({ msg: "invalid user" });
        }

        const user = await bcrypt.compare(password, userExist.password)
        if(user){
            res.status(200).json({ msg: "Login complete", token: await userExist.generateToken(), userId: userExist._id.toString() });
  

        } else{
            res.status(401).json({msg:"Invalid Password or Email"});
        }
        
    } catch (error) {

        console.error('Error in Login:', error);
        res.status(500).json({ msg: 'Internal Server Error' });

       
        
    }
}

module.exports = { home, register , login};
