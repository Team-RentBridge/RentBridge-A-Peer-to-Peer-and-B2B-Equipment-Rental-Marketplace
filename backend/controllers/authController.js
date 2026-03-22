const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{

const {name,email,password,role} = req.body;

try{

const hashed = await bcrypt.hash(password,10);

const user = await pool.query(
"INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
[name,email,hashed,role]
);

res.json(user.rows[0]);

}catch(err){
res.status(500).json(err.message);
}

};

exports.login = async (req,res)=>{

const {email,password} = req.body;

try{

const user = await pool.query(
"SELECT * FROM users WHERE email=$1",[email]
);

if(user.rows.length===0){
return res.status(400).json("User not found");
}

const valid = await bcrypt.compare(
password,
user.rows[0].password
);

if(!valid){
return res.status(400).json("Invalid password");
}

const token = jwt.sign(
{userId:user.rows[0].id},
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.json({token,user:user.rows[0]});

}catch(err){
res.status(500).json(err.message);
}

};