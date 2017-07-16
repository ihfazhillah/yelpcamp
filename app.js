var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/user'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds');

// Routers
var campgroundsRouter = require('./routes/campgrounds'),
    commentsRouter = require('./routes/comments'),
    indexRouter = require('./routes/index');

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// seedDB(); // seeds db

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "hoho hoho 12345",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routers config
app.use(indexRouter);
app.use("/campgrounds", campgroundsRouter);
app.use("/campgrounds/:id/comments", commentsRouter);


app.listen(3000, function(){
    console.log("YelpCamp Has Started");
});
