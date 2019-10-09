const express= require("express")
const bodyParser= require("body-parser")
const request=require("request")

const app= express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){

var val1= req.body.crypto
var val2= req.body.fiat
console.log(req.body.crypto)
console.log(req.body.fiat)

var finalVal= val1 + val2
var baseURL= "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
var finalURL= baseURL + finalVal

  request(finalURL,function(error,response,body){
    var val= JSON.parse(body)
    console.log(body)
    console.log("The averages per day is " + val.averages.day)
    console.log(val.display_timestamp)
    console.log(val.last)


   res.write("<p>The Current date and time is " + val.display_timestamp +"</p>")
   res.write("<h1>The current value of " + val1 + " in " + val2 + " is "+ val.last + "</h1>")
   res.send()
  })

})


app.listen(3000, function(){
  console.log("Listening on Port 3000")
})
