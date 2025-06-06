const express= require("express");
const app = express();
const path = require("path");

const port = 8080;

//serving static files
// app.use(express.static("public"));

app.use(express.static(path.join(__dirname , "/public/js")));
app.use(express.static(path.join(__dirname , "/public/css")));


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));


app.get("/" , (req , res) =>{
    // res.send("this is root");
    res.render("home.ejs");

});

app.get("/hello" , (req , res) =>{
    res.send("hello");
});

app.get("/rolldice" , (req , res) => {
    let num = Math.floor(Math.random() * 6) +1;
    res.render("rolldice.ejs" , {diceval : num});
});

app.get("/ig/:username" , (req , res) =>{
    let { username } = req.params;
    const instaData = require("./data.json")
    // console.log(instaData);
    // const followers =["Aditya" , "Atharva" , "tanvi" , "sakshi" , "mansi"];
    // let { username } = req.params;
    // console.log(username);
    // res.render("instagram.ejs" , {username , followers});
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs" , {data});
    }else{
        res.render("error.ejs");
    }
    // console.log(data);
    // res.render("instagram.ejs" , { data });
});

app.listen(port , ()=>{
    console.log(`Listening on port ${port}`);

});