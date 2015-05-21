
var image = new Image;

image.crossOrigin = "Anonymous";
image.src = "starry.jpg"

image.onload = function() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    var board = new Board()

    for (var k = 0; k < 50; k++) {
      board.ants.push(new Ant(Math.round(Math.random() * board.cols), Math.round(Math.random() * board.rows), Math.round(Math.random()*3)));
      board.ants.push(new Ant(Math.round(Math.random() * board.cols), Math.round(Math.random() * board.rows), Math.round(Math.random()*3)));
    }
    board.start();

    $("#canvas").click(function(e){
        var x = e.pageX-$("#canvas").offset().left;
        var y = e.pageY-$("#canvas").offset().top;

        board.clicks.push([x,y,0]);
    });

    ctx.drawImage(image, 0, 0, image.width, image.height);

    var size = 25 / 100,
     w = canvas.width * size,
     h = canvas.height * size;

    ctx.drawImage(image, 0, 0, w, h);

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    $('.slideout-menu-toggle').on('click', function(event){
    	event.preventDefault();
    	// create menu variables
    	var slideoutMenu = $('.slideout-menu');
    	var slideoutMenuWidth = $('.slideout-menu').width();

    	// toggle open class
    	slideoutMenu.addClass("open");

    	// slide menu
    	if (slideoutMenu.hasClass("open")) {
	    	slideoutMenu.animate({
		    	left: "0px"
	    	});
    	} else {
	    	slideoutMenu.animate({
		    	left: -slideoutMenuWidth
	    	}, 250);
    	}
    });

    $('.slideout-menu-close').on('click', function(event){
      event.preventDefault();
      var slideoutMenu = $('.slideout-menu');
    	var slideoutMenuWidth = $('.slideout-menu').width();

    	// toggle open class
    	slideoutMenu.removeClass("open");
      slideoutMenu.animate({
        left: -slideoutMenuWidth
      }, 250);
    });
}
