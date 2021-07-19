const express =require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const https= require("https");

const app=express();

app.use(express.static("public"));//responsible for rendering the css
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
});

app.post("/",function(req,res){
  var firstName=  req.body.firstname;
  var lastName=  req.body.lastname;
  var email=  req.body.email;
  var data={
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields : {
                    FNAME: firstName,
                    LNAME:lastName
              }
          }
      ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us1.api.mailchimp.com/3.0/lists/61f0839d6c";
  const option={
      method:"POST",
      auth:"Vinayak:4ac09be7c7ab93af2098a08149993b17-us1"

  }
  const request = https.request(url,option,function(){
       
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/Success.html");

    } else {
        res.sendFile(__dirname+ "/failure.html");
    }
    
    
    response.on("data",function(data){
            console.log(JSON.parse(data));
        })
  })
  request.write(jsonData);
  request.end();
  
});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT||3000 ,function(){
    console.log("server is running on port 3000");
});


//Api key- 4ac09be7c7ab93af2098a08149993b17-us1
//list id 61f0839d6c