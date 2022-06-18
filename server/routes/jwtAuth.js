const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGen = require("../utilities/jwtGen");
const validmail = require("../middleware/validmail");
const authorize = require("../middleware/authorize");


router.post('/register',validmail, async (req,res)=>{ 
    try {
         
        const  {name, realname , email, password} = req.body;

        const user = await pool.query("SELECT * from users WHERE useremail = $1", [email
        ]);

        if(user.rows.length !==0){
            return res.status(401).send("User Already Registered");
        }

        const salty = 10;
        const salt = await bcrypt.genSalt(salty);

        const bcryptpass = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT into users(username, realname, useremail, userpw) VALUES ($1 ,$2, $3, $4) RETURNING *",[name,realname,email,bcryptpass]);

        const token = jwtGen(newUser.rows[0].userid);

        res.json({token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("SV err");
    }
}); 

//login
router.post("/login",validmail, async(req,res) =>{
try {

    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE useremail = $1", [
      email
    ]);

    if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }

      const validpw = await bcrypt.compare(
        password,
        user.rows[0].userpw
      );
      
      if (!validpw) {
        return res.status(401).json("Invalid Credential");
      }

      const token = jwtGen(user.rows[0].userid);
    return res.json({ token });

} catch (err) {
    console.error(err.message);
    res.status(500).send("SV err");
}
});


router.get("/is-verify", authorize, async (req,res)=>{
try {
    res.json(true);
} catch (err) {
    console.error(err.message);
    res.status(500).send("SV err");
 
}
});





module.exports=router;