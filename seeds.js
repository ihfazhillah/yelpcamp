var Campground = require('./models/campground');
var Comment = require('./models/comment');

data = [
    {
        name: 'Hutan Hijau', 
        image: 'https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg',
        description: 'Proin molestie, metus nec pulvinar euismod, elit tellus consectetur tortor, non tempus lorem felis nec dui. Maecenas suscipit odio metus, et hendrerit nisl cursus quis. Proin lobortis leo est, ut tempus leo dignissim non. Aenean molestie condimentum sem. Vestibulum et faucibus nibh, eget tristique eros. Morbi ac laoreet neque, ut viverra orci. Duis malesuada elit at ante suscipit, nec sagittis arcu aliquam. Pellentesque a eros ultrices, lobortis elit vel, suscipit velit. Aenean non felis lacus.'

    },
    {
        name: 'Padang Tandus', 
        image: 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg',
        description: 'Proin molestie, metus nec pulvinar euismod, elit tellus consectetur tortor, non tempus lorem felis nec dui. Maecenas suscipit odio metus, et hendrerit nisl cursus quis. Proin lobortis leo est, ut tempus leo dignissim non. Aenean molestie condimentum sem. Vestibulum et faucibus nibh, eget tristique eros. Morbi ac laoreet neque, ut viverra orci. Duis malesuada elit at ante suscipit, nec sagittis arcu aliquam. Pellentesque a eros ultrices, lobortis elit vel, suscipit velit. Aenean non felis lacus.'
    },
    {
        name: 'Pantai', 
        image: 'http://www.photosforclass.com/download/14435096036',
        description: 'Proin molestie, metus nec pulvinar euismod, elit tellus consectetur tortor, non tempus lorem felis nec dui. Maecenas suscipit odio metus, et hendrerit nisl cursus quis. Proin lobortis leo est, ut tempus leo dignissim non. Aenean molestie condimentum sem. Vestibulum et faucibus nibh, eget tristique eros. Morbi ac laoreet neque, ut viverra orci. Duis malesuada elit at ante suscipit, nec sagittis arcu aliquam. Pellentesque a eros ultrices, lobortis elit vel, suscipit velit. Aenean non felis lacus.'
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

