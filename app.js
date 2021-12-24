//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _=require("lodash");




const homeStartingContent = "This is your Journey through the years of glory,fear,motivation,success,failures! Make a new addition to your life experiences and brush up the older ones! you have a beautiful life, cherish it and don't let it down by some symbolic represenation of harsh truth.This is your life and you will decide what course you will take for the better or the worse but the decision is yours.Go on and make a new note of your wonderful life with all the emotions you have got and give a kickstart to a new bright day with all the luck and devotion!"
const aboutContent = "Soul stories is a Daily Journal to register the events that we want to remember till the end of time.This is made as an initiative to improve the lifestyle since talking to your own thoughts is something that boosts up our confidence.After spending a long day when we pen it down then we realise how productice the day was and it provides us ways to improve our lifestyle.It unravels the loopholes that exist while we work and allows us to introspect our every action for the better good of our next day! So buckle up and pen down your thoughts and be ready for the improvement like never before.";
const contactContent = "Risque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const buySubscription = "Buy the annual subscription at just 120$ annually!"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-Jafrin:Test123@cluster0.vacef.mongodb.net/blogDB", {useNewUrlParser: true});


const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model("Post",postSchema);




app.get("/",function(req,res){
  // my changes
  Post.find({}, function(err, posts){

     res.render("home", {

       startingContent: homeStartingContent,

       posts: posts

       });
       });
  

});



app.get("/buySubscription",function(req,res){
  res.render("buySubscription",{buySubscription:buySubscription});

});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});


app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});



// res.body comes from body parser module that we downloaded and postTitle is the name of the input
app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody

  });
  post.save(function(err){

    if (!err){

      res.redirect("/");

    }

  });

});



app.get("/posts/:postId",function(req,res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){

     res.render("post", {

       title: post.title,

       content: post.content

     });

   });



      });

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
