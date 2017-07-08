var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var campGrounds = [
    {name: "Grafika Cikole", image: "https://bacaterus.com/wp-content/uploads/2016/07/Grafika-Cikole-%E2%80%93-Lembang-Bandung.jpg"},
    {name: "Kampung Jawa Kembang", image: "https://bacaterus.com/wp-content/uploads/2016/07/Kampung-Jawa-Kembang-%E2%80%93-Sleman-Yogyakarta-Copy-600x338-Copy.jpg"},
    {name: "Dusun Kreatif", image: "https://bacaterus.com/wp-content/uploads/2016/07/Dusun-Kreatif-%E2%80%93-Medan-Copy-600x295-Copy.jpg"},
    {name: "Lembah Hijau", image: "https://bacaterus.com/wp-content/uploads/2016/07/Taman-Rekreasi-Lembah-Hijau-%E2%80%93-Samarinda-Copy.jpg"}
]

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campGrounds: campGrounds});

});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;

    campGrounds.push({name: name, image: image});

    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(3000, function(){
    console.log("YelpCamp Has Started");
});
