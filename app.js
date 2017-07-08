var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);



app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campGrounds: campgrounds});
        }
    });

});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;

    Campground.create({name: name, image: image}, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(3000, function(){
    console.log("YelpCamp Has Started");
});
