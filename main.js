$(document).ready(function () {

    YUI().use('yql', function (Y) {
        var query = 'select * from rss(0,5) where url = "http://qz.com/feed/"'
        Y.YQL(query, function (r) {
            //r now contains the result of the YQL Query as a JSON
            var images = r.query.results.item // get feed as array of entries

            var image_index = 0;

            function place_images() {

                var next_image_index = image_index + 1;

                if (next_image_index == images.length) {
                    next_image_index = 0;
                }

                var front_image = '<section class="container"><div class="left-half"><article><img src="'
                    + (images[image_index].thumbnail ? images[image_index].thumbnail.url : null)
                    + '"/></article></div><div class="right-half"><article><h1>'
                    + images[image_index].title + '</h1><p>'
                    + images[image_index].description
                    + '</p></article></div></section>';
                var back_image = '<section class="container"><div class="left-half"><article><img src="'
                    + (images[next_image_index].thumbnail ? images[next_image_index].thumbnail.url : null)
                    + '"/></article></div><div class="right-half"><article><h1>'
                    + images[next_image_index].title + '</h1><p>'
                    + images[next_image_index].description
                    + '</p></article></div></section>';


                $('.back-image-top').html("").append(back_image);
                $('.back-image-bottom').html("").append(back_image);

                $('.front-image-top').html("").append(front_image);
                $('.front-image-bottom').html("").append(front_image);
            }


            $('.flip-images').append("<div class='flip-container'>\
								<div class='flip-top'>\
									<div class='shadow-top-front'></div>\
									<div class='front-image-top'></div>\
									<div class='back-image-bottom'></div>\
									<div class='shadow-top-back'></div>\
							    </div>\
							    <div class='back-image-top'></div>\
								<div class='flip-bottom'>\
									<div class='shadow-bottom'></div>\
									<div class='front-image-bottom'></div>\
								</div>\
							  </div>");
            place_images(image_index);

            $('#flip-one-more').click(function () {

                $(".back-image-bottom").css("display", "block");

                flip_container = $('.flip-container');
                new_flip_container = flip_container.clone(true);
                flip_container.before(new_flip_container);
                $("." + flip_container.attr("class") + ":last").remove();

                place_images();

                $('.flip-top').addClass('flip');
                $('.shadow-top-front').addClass('shadow-top-front-animate');
                $('.shadow-top-back').addClass('shadow-top-back-animate');
                $('.shadow-bottom').addClass('shadow-bottom-animate');
                image_index++;
                if (image_index == images.length) {
                    image_index = 0;
                }

                return false;
            });

        })
    })


});