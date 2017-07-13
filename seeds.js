var Campground = require('./models/campground');
var Comment = require('./models/comment');

data = [
    {
        name: 'Hutan Hijau', 
        image: 'https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg',
        description: 'blah blah blah'
    },
    {
        name: 'Padang Tandus', 
        image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
        description: 'blah blah blah'
    },
    {
        name: 'Pantai', 
        image: 'http://www.photosforclass.com/download/14435096036',
        description: 'blah blah blah'
    }
]

function seedDB(){
    // remove all data
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('All data removed');
            // Insert all campground dummy data

            data.forEach(function(camp){
                Campground.create(camp, function(err, createdCamp){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('campground created');
                        var comment = new Comment(
                            {
                                text: 'Hellow, this is a dummy comment',
                                author: 'Admin'
                            }
                        );

                        comment.save(function(err, com){
                            if(err){
                                console.log(err);
                            } else {
                                createdCamp.comments.push(com);
                                createdCamp.save();
                                console.log('comment created');
                            }
                        });

                    }
                });
            });
        }
    });
}

module.exports = seedDB;

