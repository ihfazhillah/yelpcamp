var express = require('express'),
    Campground = require('../models/campground');

var router = express.Router();

router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", {campGrounds: campgrounds});
        }
    });

});

// create rout
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }

    var newCampground = {
        name: name,
        image: image,
        description:description,
        author: author
    }

    Campground.create(newCampground, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});

// create form
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// show route
router.get("/:id", function(req, res){
Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// Middle ware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}
module.exports = router;
