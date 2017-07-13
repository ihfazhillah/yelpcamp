var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


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
    var description = req.body.description;

    Campground.create({name: name, image: image, description:description}, function(err, campground){
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

app.get("/campgrounds/:id", function(req, res){
Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(3000, function(){
    console.log("YelpCamp Has Started");
});
