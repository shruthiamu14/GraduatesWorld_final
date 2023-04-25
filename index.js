
const express = require("express");  
const app = express();
const nodemailer = require('nodemailer');
const sql = require("mysql");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const { promisify } = require("util");


const db = sql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  else console.log("Database Connected Successfully");
});

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.listen(5000);

const path = require("path");
const { error } = require("console");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.userSave) {
      try {
          // 1. Verify the token
          const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
          console.log(decoded);

          // 2. Check if the user still exist
          db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
              console.log(result);
              if (!result) {
                  return next();
              }
              req.user = result[0];
              return next();
          });
      } catch (err) {
          console.log(err)
          return next();
      }
  } else {
      next();
   }
}

let fn=""
let psd=""
let cnfpsd=""
let me = ""
let ga =""
let msg =""
let reg =""
let data=""
let pass=""
let cfmpass=""
let getname = ""
let getemail = ""
//let getname1 = ""

app.get("/register", (req, res) => {
  res.render("register",{me,fn,psd,cnfpsd,ga,msg,reg,pass,cfmpass,va});
});

app.get("/login", (req, res) => {
  res.render("login",{data});
});

app.get("/verify", (req, res) => {
  res.render("verify",{crt});
});


app.get("/verify_expert", (req, res) => {
  res.render("verify_expert",{ex});
});

app.get("/expertotp", (req, res) => {
  res.render("expertotp",{ot});
});

app.get("/expertforgot", (req, res) => {
  res.render("expertforgot",{mat});
});

app.get("/verifyotp", (req, res) => {
  res.render("verifyotp",{incrt});
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword",{mis});
});

// app.get("/dashboard", (req, res) => {
//   res.render("dashboard",{getname,getemail});
// });


app.get("/expertreg", (req, res) => {
  res.render("expertreg");
});

app.get("/adminlogin", (req, res) => {
  res.render("adminlogin",{no});
});

app.get("/adobe", (req, res) => {
  res.render("adobe");
});
app.get("/amazon", (req, res) => {
  res.render("amazon");
});
app.get("/expertlogin", (req, res) => {
  res.render("expertlogin",{data});
});
app.get("/microsoft", (req, res) => {
  res.render("microsoft");
});
app.get("/ourcollab", (req, res) => {
  res.render("ourcollab");
});

app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/accenture", (req, res) => {
  res.render("accenture");
});
app.get("/contactabout", (req, res) => {
  res.render("contactabout");
});

app.get("/cscience", (req, res) => {
  res.render("cscience");
});

app.get("/deloitte", (req, res) => {
  res.render("deloitte");
});

app.get("/ejobdesc1", (req, res) => {
  res.render("ejobdesc1");
});
app.get("/ejobdesc2", (req, res) => {
  res.render("ejobdesc2");
});
app.get("/ejobdesc3", (req, res) => {
  res.render("ejobdesc3");
});

app.get("/electronics", (req, res) => {
  res.render("electronics");
});

app.get("/expert-test", (req, res) => {
  res.render("expert-test");
});

app.get("/expPersonalinfo", (req, res) => {
  res.render("expPersonalinfo",{a,b,c,d,reg,msg});
});

app.get("/ibm", (req, res) => {
  res.render("ibm");
});

app.get("/infosys", (req, res) => {
  res.render("infosys");
});

app.get("/jobdesc1", (req, res) => {
  res.render("jobdesc1");
});
app.get("/jobdesc2", (req, res) => {
  res.render("jobdesc2");
});
app.get("/jobdesc3", (req, res) => {
  res.render("jobdesc3");
});

app.get("/jobsapplied", (req, res) => {
  res.render("jobsapplied");
});

app.get("/oracle", (req, res) => {
  res.render("oracle");
});
app.get("/personalinfo", (req, res) => {
  res.render("personalinfo");
});

app.get("/portfolios", (req, res) => {
  res.render("portfolios");
});

app.get("/seekworkaccount", (req, res) => {
  res.render("seekworkaccount");
});

app.get("/thanksexpertquiz", (req, res) => {
  res.render("thanksexpertquiz");
});

app.get("/thanksUser", (req, res) => {
  res.render("thanksUser");
});

app.get("/thanksuserquiz", (req, res) => {
  res.render("thanksuserquiz");
});

app.get("/userquiz", (req, res) => {
  res.render("userquiz");
});

// app.get("/addajob", (req, res) => {
//   res.render("addajob",{getnamee,getemaill,ad});
// });





app.get("/verifyreg", (req, res) => {
  res.render("verifyreg",{va});
  va =""
});

// app.get('/Allexperts', function (req, res, next) {
//   db.query('SELECT * FROM expert', function (err, rows) {
//       if (err) {
//         throw err ; 
//         req.flash('error', err)
//         res.render('Allexperts', { data: '' })
      
//       } else {
//         res.render('Allexperts', { data: rows })
//       }
//     })
//   })
  
  app.post('/search', function (req, res, next) {
    let skill = req.body.selectfields;
    //console.log(skills);
  
    db.query('SELECT * FROM expert where Skills = ?',[skill], function (err, rows) {
        if (err) {
         // req.flash('error', err.message)
        //  res.render('Allexperts', { data: '' })
        throw err ; 
        } else {
          res.render('Allexperts', { data: rows })
        }
      })
    })

  app.post('/searchuser', function (req, res, next) {
    let skill = req.body.selectfields;
    //console.log(skill);
  
    db.query('SELECT * FROM register where specialization = ?',[skill], function (err, rows) {
        if (err) {
         // req.flash('error', err.message)
        //  res.render('Allexperts', { data: '' })
        throw err ; 
        } else {
          res.render('Allusers', { datau: rows })
        }
      })
    })



function phoneno(num) {
  //console.log(typeof(num));
  return /^[6-9]\d{9}$/.test(num);
}
function check_pincode(num) {
  return /^\d{6}$/.test(num);
}

function onlyLetters(str) {
  return /^[A-Za-z\s]*$/.test(str);
}
function validEmail(str) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

function checkpassword(str)
{
  return /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(str);
}


function generateP() {
  var pass = '';
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    
  for (let i = 1; i <= 10; i++) {
      var char = Math.floor(Math.random()
                  * str.length + 1);
        
      pass += str.charAt(char)
  }
    
  return pass;
}

function generateOTP() {
  var otp_gen = Math.random();
  otp_gen = otp_gen * 1000000;
  otp_gen = parseInt(otp_gen);

  return otp_gen;
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service : 'gmail',
  
  auth: {
    user: 'shyambhaskar27820@gmail.com',
    pass: 'qbvxwmqcmcqxvblx',
  }
  
});

app.get('/logout' , (req, res) => {
  res.cookie('userSave', 'logout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
  });
  res.clearCookie('isLoggedIn')
  res.status(200).redirect("/");
});

app.get('/adminlogout' , (req, res) => {
  res.cookie('userSavee', 'adminlogout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
  });
  res.clearCookie('isLoggedInn')
  res.status(200).redirect("/");
});

app.get('/expertlogout' , (req, res) => {
  res.cookie('userSaveee', 'expertlogout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
  });
  res.clearCookie('isLoggedInnn')  
  res.status(200).redirect("/");
});



var otp3 = ""
var name_reg;
var email_reg;
var address_reg; 
var city_reg; 
var pincode_num_reg;
var phone_num_reg;
var password_reg;
var confirm_password_reg;
var specialisation_reg;

app.post("/register", (req, res) => {
  name_reg = req.body.name;
  email_reg = req.body.email;
  address_reg = req.body.address;
  city_reg = req.body.city;
  pincode_num_reg = req.body.Pincode;
  phone_num_reg = req.body.Phone;
  password_reg = req.body.password;
  confirm_password_reg = req.body.passwordConfirm;
  specialisation_reg = req.body.spe;

if(!(phoneno(phone_num_reg))) {
  psd = "Incorrect Phone Number"
}
else
psd = "";

if(!(check_pincode(pincode_num_reg) )) {
 
  cnfpsd = "Incorrect pincode"
}
else
cnfpsd="";
  if(!onlyLetters(name_reg))
{
   fn="Incorrect user name"
}

else
fn="";

if(name_reg =="")
 {
  me = "Enter a valid user name"
 }
 else
 me = "";

if(!validEmail(email_reg)) {
  ga = "Enter valid email"
}
else
ga = "";
if(!checkpassword(password_reg))
{
  pass="Enter a valid password"
}
else
pass="";

if(password_reg != confirm_password_reg)
{
   cfmpass="Password did not match"
}
else
cfmpass="";

  db.query("create table if not exists register(id MEDIUMINT NOT NULL AUTO_INCREMENT,username varchar(50) , email varchar(50) , address varchar(100) , city varchar(50) , pincode varchar(10) , phone varchar(20) , password varchar(50),specialization varchar(50),PRIMARY KEY (id) );")
  db.query("create table if not exists user_login (id MEDIUMINT NOT NULL AUTO_INCREMENT,email varchar(50),password varchar(20),PRIMARY KEY (id));")
  if(onlyLetters(name_reg) && checkpassword(password_reg) && password_reg == confirm_password_reg && validEmail(email_reg) && (check_pincode(pincode_num_reg)) && (phoneno(phone_num_reg)))
      {
        
          db.query("select email from register where email = ?",[email_reg],(err,result)=> {
            if(err) throw err
            else if(result.length==0) {
              otp3 = generateOTP();

              var mailOptions={
                to: email_reg,
                subject: "Otp for Verification is: ",
                html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp3 +"</h1>" // html body
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);   
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.redirect('/verifyreg');
            });
             
            }
            else {
             reg = "Email already exists"
             console.log(reg);
             res.redirect("/register")
            }
          })
         
           
  }
  else{
    msg ="Invalid Credentials"
    res.redirect("/register")
  }
});

let va = ""
app.post("/verifyreg",(req,res)=>{
  const otp_enter = req.body.otp;
  

  if(otp3==otp_enter) { 
    if(onlyLetters(name_reg) && checkpassword(password_reg) && password_reg == confirm_password_reg && validEmail(email_reg) && (check_pincode(pincode_num_reg)) && (phoneno(phone_num_reg))) {
      db.query(`insert into register (username,email,address,city,pincode,phone,password,specialization) values (?,?,?,?,?,?,?,?)`,[name_reg,email_reg,address_reg,city_reg,pincode_num_reg,phone_num_reg,password_reg,specialisation_reg])
      db.query("insert into user_login (email,password) values (?,?)",[email_reg,password_reg])
      res.redirect("/thanksUser")
    }
    else {
      va = "Invalid Register Details"
      res.redirect("/register")
    }
  }
  else {
    va = "Invalid Otp"
    res.redirect("/verifyreg")
   
  }

});

app.post("/reverifyreg",(req,res)=>{
  otp3 = generateOTP();
  var mailOptions={
      to: email_reg,
     subject: "Otp for Verification is: ",
     html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp3 +"</h1>" // html body
   };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect("/verifyreg");
  });
})

let a = ""
let b = ""
let c = ""
let d = ""


app.post("/expPersonalinfo" , (req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const experience = req.body.exp;
  const graduation = req.body.grad;
  const address = req.body.address;
  const phone = req.body.Phone;
  const Skills = req.body.skill;

if(!(onlyLetters(name))) {
  a = "Enter valid Name"
}
else
a = ""

if(!validEmail(email)) {
  b = "Enter a valid email"
}
else
b = ""
if(phoneno(phone)) {
  c = "Enter a valid mobile number"
}
else
c =""

if(graduation=="" || experience=="" || address=="") {
  d = "This field can't be empty"
}
else 
 d =""

 db.query("create table if not exists expert(id MEDIUMINT NOT NULL AUTO_INCREMENT,username varchar(50) , email varchar(50) , experience varchar(50) , graduation varchar(50) , address varchar(100),phone varchar(20),Skills varchar(50),PRIMARY KEY (id) );")

if(onlyLetters(name) && validEmail(email))
      {
          db.query("select email from expert where email = ?",[email],(err,result)=> {
            if(err) 
              throw err
            else if(result.length==0) {
              db.query(`insert into expert (username,email,experience,graduation,address,phone,Skills) values (?,?,?,?,?,?,?)`,[name,email,experience,graduation,address,phone,Skills])
              

            res.redirect("/expertreg")
            }
            else {
             reg = "Email already exists"
             console.log(reg);
             res.redirect("/expPersonalinfo")
            }
          })
         
           
  }
  else{
    msg ="Invalid Credentials"
    res.redirect("/expPersonalinfo")
  }

  
});

let crt = ""
var email1;
var otp;
app.post("/verify",(req,result)=>{
  email1 = req.body.email;
  // otp = Math.random();
  // otp = otp * 1000000;
  // otp = parseInt(otp);
  otp = generateOTP();

  
  db.query("select email from register where email=?",[email1],(err,res)=>{
    if(err) {
      console.error(err.message);
    }
    if(res.length!=0){
      var mailOptions={
        to: email1,
        subject: "Otp for Verification is: ",
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        result.redirect("/verifyotp");
    });
      
    }
    else {
      crt = "User is not registered "
      result.redirect("/verify")
    }

  });
});

let incrt =""
app.post("/verifyotp",(req,res)=>{
  const otp_enter = req.body.otp;
  console.log(otp_enter);
  console.log(otp)
  if(otp==otp_enter) {
    res.redirect("/forgotPassword")
  }
  else {
    incrt = "OTP is Incorrect"
    // console.log(incrt)
    res.redirect("/verifyotp")
  }
});

app.post('/reverify',function(req,res){
  otp = generateOTP();
  var mailOptions={
      to: email1,
     subject: "Otp for Verification is: ",
     html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
   };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect("/verifyotp");
  });

});

let mis=""
app.post("/forgotPassword",(req,res)=>{
  const pass = req.body.password;
  const confirm = req.body.passwordConfirm;

  if(pass==confirm) {
    db.query("update register set password=? where email=?",[pass,email1],(err,result)=>{
      if(err) {
        console.error(err.message)
      }
      else{
        mis = "Password and Confirm Password Didn't match"
        res.redirect("/login");
        // console.log("Password Successfuly Changed")
      }
    })
  }
});

let ex=""
var email2;
var otp2;
app.post("/verify_expert",(req,result)=>{
  email2 = req.body.email;
  // otp = Math.random();
  // otp = otp * 1000000;
  // otp = parseInt(otp);
  otp2 = generateOTP();

  
  db.query("select email from expert where email=?",[email2],(err,res)=>{
    if(err) {
      console.error(err.message);
    }
    if(res.length!=0){
      var mailOptions={
        to: email2,
        subject: "Otp for Verification is: ",
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp2 +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        result.redirect("/expertotp");
    });
      
    }
    else {
      ex = "Expert is not registered "
      result.redirect("/verify_expert")
    }

  });
});

let ot=""
app.post("/expertotp",(req,res)=>{
  const otp_enter = req.body.otp;
  console.log(otp_enter);
  console.log(otp2)
  if(otp2==otp_enter) {
    res.redirect("/expertforgot")
  }
  else {
    ot = "OTP is Incorrect"
    // console.log(incrt)
    res.redirect("/expertotp")
  }
});

app.post('/reverify_otp',function(req,res){
  otp2 = generateOTP();
  var mailOptions={
      to: email2,
     subject: "Otp for Verification is: ",
     html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp2 +"</h1>" // html body
   };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect("/expertotp");
  });

});

let mat=""
app.post("/expertforgot",(req,res)=>{
  const pass = req.body.password;
  const confirm = req.body.passwordConfirm;

  if(pass==confirm) {
    db.query("update expert_login set password=? where email=?",[pass,email2],(err,result)=>{
      if(err) {
        console.error(err.message)
      }
      else{
        res.redirect("/expertlogin");


        // console.log("Password Successfuly Changed")
      }
    })
  }
  else {
    mat = "Password and Confirm Password Didn't match"
    res.redirect("/expertforgot");
  }

});



app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "select * from user_login where email=? and password=? ",
    [email, password],
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      if (result.length !== 0) {
        db.query("select * from register where email=?",[email],(err,result)=> {
                getname = result[0].username;
                getemail = email;
                //console.log(getname)
              });

              const id = result[0].id;

              const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
              });

             
              console.log("the token is " + token);

              const cookieOptions = {
                  expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
              }
              
              res.cookie('userSave', token, cookieOptions);
           
              // res.json({
              //   message:'redirected'
              // });
              res.cookie('isLoggedIn','ok')
              res.redirect("/userdashboard");
      } else {
        data = "Incorrect Login details";
        res.redirect("/login");
      }
    }
  );
  
});
// let getnameee = "";
// let getemailll = "";

app.post("/expertlogin", (req, res) => {
  const email = req.body.email;                    
  const password = req.body.password;
  db.query(
    "select * from expert_login where email=? and password=? ",
    [email, password],
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      if (result.length !== 0) {
        db.query("select email from expert where email=?",[email],(err,result)=> {
                getnameee= result[0].username;
                getemailll = email;
                console.log(getname);
              });
              const id = result[0].id;

              const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
              });

             
              console.log("the token is " + token);

              const cookieOptions = {
                  expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
              }
              
              res.cookie('userSaveee', token, cookieOptions);
           
              // res.json({
              //   message:'redirected'
              // });
              res.cookie('isLoggedInnn','ok')
              res.redirect("/expertdashboard");
     
      } else {
        data = "Incorrect Login details";
        res.redirect("/expertlogin");
      }
    }
  );
  
});

let no =""

let getnamee = "";
let getemaill = "";
app.post("/adminlogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "select * from admin_login where email=? and password=? ",
    [email, password],
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      else if (result.length !== 0) {
        db.query("select name from admin_login where email=?",[email],(err,result)=> {
                getnamee = result[0].name;
                getemaill = email;
                console.log(getnamee);
              });
              const id = result[0].id;

              const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
              });

             
              console.log("the token is " + token);

              const cookieOptions = {
                  expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
              }
              
              res.cookie('userSavee', token, cookieOptions);
           
              // res.json({
              //   message:'redirected'
              // });
              res.cookie('isLoggedInn','ok')
              res.redirect("/admindashboard");
       // res.redirect("/admindashboard");
      } 
      else {
        no = "Access Restricted";
        res.redirect("/adminlogin");
      }
    }
  );
  
});

app.use('/userdashboard',(req,res)=>{
  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      const getname = result[0].username;
      const getemail = result[0].email;
      db.query('select * from available_jobs',(err,values)=>{
        if(err){
          console.log(err);
          return res.render('error', { message: 'An error occurred' });
        }
          res.render('userdashboard', { getname, getemail,values });
      });

    });
  } else {
    return res.render('login', { data});
}
});

app.post("/searchavailable",(req,res)=>{
  const get = req.body.sea;
  //console.log(get)

  db.query("SELECT * FROM available_jobs WHERE role LIKE ?",[`%${get}%`],(err,values)=>{
    if(err){
      console.log(err);
      return res.render('error', { message: 'An error occurred' });
    }
      res.render('userdashboard', { getname, getemail,values });
  })
});

app.post("/searchapplied",(req,res)=>{
  const get = req.body.sea;
  console.log(get)

  db.query("SELECT * FROM jobs_applied WHERE role LIKE ?",[`%${get}%`],(err,values)=>{
    if(err){
      console.log(err);
      return res.render('error', { message: 'An error occurred' });
    }
   
      res.render('userdashappliedj', { getname, getemail,values });
  })
});



app.post("/searchapplied",(req,res)=>{
  const get = req.body.sea;
  //console.log(get)

  db.query("SELECT * FROM jobs_applied WHERE role LIKE ?",[`%${get}%`],(err,values)=>{
    if(err){
      console.log(err);
      return res.render('error', { message: 'An error occurred' });
    }
      res.render('userdashboard', { getname, getemail,values });
  })
});


  app.use('/Allexperts',(req,res)=>{
    if(req.cookies.isLoggedIn){
      db.query('SELECT * FROM expert', function (err, rows) {
        if (err) {
          throw err ; 
        } else {
          res.render('Allexperts', { data: rows })
        }
      })
      
    } else {
      return res.render('login', { data });
  }
  });

  app.use('/Allusers',(req,res)=>{
    if(req.cookies.isLoggedInnn){
      db.query('SELECT * FROM register', function (err, rows) {
        if (err) {
          throw err ; 
        } else {
          res.render('Allusers', { datau: rows })
        }
      })
      
    } else {
      return res.render('expertlogin', { data });
  }
  });





app.use('/userdashappliedj',(req,res)=>{
  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      const getname = result[0].username;
      const getemail = result[0].email;

      //console.log(getname);
      //console.log(result[0]);
      
      //    res.render('userdashappliedj', { getname, getemail});
      db.query('select * from jobs_applied',(err,values)=>{
        if(err){
          console.log(err);
          return res.render('error', { message: 'An error occurred' });
        }
          res.render('userdashappliedj', { getname, getemail,values });
      });


    
    });
  } else {
    return res.render('login', { data });
  }
});


app.use('/update',(req,res)=>{
  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      const getname = result[0].username;
      const getemail = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('update', {up});
    });
  } else {
    return res.render('login', { data });
  }
});




app.use('/usertest',(req,res)=>{
  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      const getname = result[0].username;
      const getemail = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('usertest', { getname, getemail });
    });
  } else {
    return res.render('login', { data });
  }
});

app.get("/thankuserforquiz", (req,res)=>{
  res.render("thankuserforquiz");
});

let up = ""

app.post("/u1",(req,res)=>{
  const email = req.body.email;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set email =? where email =? ",[email,result[0].email]);
        db.query("update user_login set email =? where email =? ",[email,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});

app.post("/u2",(req,res)=>{
  const name = req.body.name;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set username =? where email =? ",[name,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});

app.post("/u3",(req,res)=>{
  const address = req.body.address;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set address =? where email =? ",[address,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});

app.post("/u4",(req,res)=>{
  const city = req.body.city;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set city =? where email =? ",[city,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});

app.post("/u5",(req,res)=>{
  const pincode = req.body.pincode;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set pincode =? where email =? ",[pincode,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});

app.post("/u6",(req,res)=>{
  const phone = req.body.phone;

  if(req.cookies.isLoggedIn){
    const decoded = jwt.verify(req.cookies.userSave,process.env.JWT_SECRET );
    db.query('SELECT * FROM register WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }
      else if(result.length!=0) {
        db.query("update register set phone =? where email =? ",[phone,result[0].email]);
        up ="Successfully Updated"
        res.redirect("/update")
      }
      else {
        up = "Not Updated "
        res.redirect("/update")
      }
    })
}
});



app.use('/admindashboard',(req,res)=>{
  if(req.cookies.isLoggedInn){
    const decoded = jwt.verify(req.cookies.userSavee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM admin_login WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnamee = result[0].name;
      const getemaill = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('admindashboard', { getnamee, getemaill });
    });
  } else {
    return res.render('adminlogin', {no});
  }
});


// app.get("/addajob", (req, res) => {
//   res.render("addajob",{getnamee,getemaill,ad});
// });

app.use('/addajob',(req,res)=>{
  if(req.cookies.isLoggedInn){
    const decoded = jwt.verify(req.cookies.userSavee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM admin_login WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnamee = result[0].name;
      const getemaill = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('addajob', { getnamee, getemaill,ad });
    });
  } else {
    return res.render('adminlogin', {no});
  }
});




app.use('/expertdashboard',(req,res)=>{
  if(req.cookies.isLoggedInnn){
    const decoded = jwt.verify(req.cookies.userSaveee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM expert WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnameee = result[0].username;
      const getemailll = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('expertdashboard', { getnameee, getemailll });
    });
  } else {
    return res.render('expertlogin', {data});
  }
});



app.use('/expertdashRegisApplicants',(req,res)=>{
  if(req.cookies.isLoggedInnn){
    const decoded = jwt.verify(req.cookies.userSaveee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM expert WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnameee = result[0].username;
      const getemailll = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('expertdashRegisApplicants', { getnameee, getemailll });
    });
  } else {
    return res.render('expertlogin', {data});
  }
});



// app.get("/removeuser", (req, res) => {
//   res.render("removeuser",{getname,getemail,no_user});
// });

app.use('/removeuser',(req,res)=>{
  if(req.cookies.isLoggedInn){
    const decoded = jwt.verify(req.cookies.userSavee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM admin_login WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnamee = result[0].name;
      const getemaill = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('removeuser', { getnamee, getemaill, no_user});
    });
  } else {
    return res.render('adminlogin', {no});
  }
});
// app.get("/removeexpert", (req, res) => {
//   res.render("removeexpert",{getname,getemail,no_expert});
// });

app.use('/removeexpert',(req,res)=>{
  if(req.cookies.isLoggedInn){
    const decoded = jwt.verify(req.cookies.userSavee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM admin_login WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnamee = result[0].name;
      const getemaill = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('removeexpert', { getnamee, getemaill,no_expert});
    });
  } else {
    return res.render('adminlogin', {no});
  }
});

// app.get("/sendmail", (req, res) => {
//   res.render("sendmail",{getname,getemail,sel_expert});
// });

app.use('/sendmail',(req,res)=>{
  if(req.cookies.isLoggedInn){
    const decoded = jwt.verify(req.cookies.userSavee,process.env.JWT_SECRET );
   // console.log(decoded);

    //2. Check if the user still exist
    db.query('SELECT * FROM admin_login WHERE id = ?', [decoded.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.render('error', { message: 'An error occurred' });
      }

      const getnamee = result[0].name;
      const getemaill = result[0].email;

      //console.log(getname);
      //console.log(result[0]);

      res.render('sendmail', { getnamee, getemaill,sel_expert});
    });
  } else {
    return res.render('adminlogin', {no});
  }
});


let no_user = ""
app.post("/remuser",(req,res)=> {
  const email = req.body.removeuser;
  console.log(email)

  db.query("select *from user_login where email=?",[email],(err,result)=>{
    if (err) {
      console.error(err.message);
    }
    else if (result.length !== 0) {
      db.query("delete from user_login where email=?",[email])
      no_user = "User Removed Successfully";
      
      res.redirect("/removeuser")
  }
  else {
     console.log("Shyam Bhaskar")
      no_user = "User not found";
      res.redirect("/removeuser")
  }
});
});

let no_expert=""
app.post("/remexpert",(req,res)=> {
  const email = req.body.removeexpert;
  console.log(email)

  db.query("select *from expert_login where email=?",[email],(err,result)=>{
    if (err) {
      console.error(err.message);
    }
    else if (result.length !== 0) {
      db.query("delete from expert_login where email=?",[email])
      no_expert = "Expert Removed Successfully";
      res.redirect("/removeexpert")
  }
  else {
      no_expert = "Expert not found";
      res.redirect("/removeexpert")          
  }
});
});

let sel_expert=""
app.post("/sendEmail",(req,res)=> {
  const email = req.body.sendmail;
  console.log(email)

  db.query("select *from expert where email=?",[email],(err,result)=>{
    if (err) {
      console.error(err.message);
    }
    else if (result.length !== 0) {
      const pass = generateP();
      // db.query("delete from expert_login where email=?",[email])
      sel_expert = "Expert selected and sent mail Successfully";
      db.query("create table if not exists expert_login(id MEDIUMINT NOT NULL AUTO_INCREMENT,email varchar(50),password varchar(20),PRIMARY KEY (id)); ")
      
      db.query("insert into expert_login (email,password) values (?,?) ",[email,pass])
      
      var mailOptions={
        to: email,
        subject: "Selected Expert Login Details : ",
        html: "<h3>Expert Password </h3>"  + "<h1 style='font-weight:bold;'>" + pass +"</h1>" 
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        res.redirect("/sendmail");
    });


     // res.redirect("/sendEmail")
  }
  else {
      sel_expert = "Expert not found";
      res.redirect("/sendmail")
  }     
});
});

let ad = ""
app.post("/job",(req,res)=>{
  const role = req.body.role;
  const company = req.body.company;
  const location = req.body.location;
  const requirements = req.body.requirements;
  db.query("create table if not exists available_jobs(id MEDIUMINT NOT NULL AUTO_INCREMENT,role varchar(50),company varchar(50),location varchar(50),requirements varchar(50),PRIMARY KEY (id)); ")
  db.query("insert into available_jobs (role,company,location,requirements) values (?,?,?,?) ",[role,company,location,requirements],(err,result)=>{
    if(err) {
      throw err
    }
    else {
      ad="Successfully added"
      res.redirect("/addajob")
    }
  })
})
app.use(express.json());

app.post("/applyjobs",(req,res)=>{
  let companyname = req.body.companyname;
  let role = req.body.role;
  // console.log(companyname,role);
  db.query("create table if not exists jobs_applied(id MEDIUMINT NOT NULL AUTO_INCREMENT,role varchar(50),company varchar(20),status varchar(20),PRIMARY KEY (id));") 
  db.query("select *from jobs_applied where company=? and role=?",[companyname,role],(err,values)=>{
    if(err) {
      throw err
    }
    else if(values.length==0) {
      db.query("insert into jobs_applied(role,company,status) values(?,?,'Applied')",[role,companyname])
    }
  })
  

})
