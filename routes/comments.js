var express = require('express'),
    Campground = require('../models/campground'),
    Comment = require('../models/comment');

var router = express.Router({mergeParams: true});

// new comment form
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// create comments route
router.post("/", isLoggedIn, function(req, res){

    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    // add author data
                    comment.author = {
                        id: req.user._id,
                        username: req.user.username
                    }
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
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
