
var image = new Image;

image.crossOrigin = "Anonymous";
image.src = "starry.jpg"

image.onload = function() {

  animate();

    $('.slideout-menu-toggle').on('click', function(event){
    	$('.slideout-menu').animate({
        left: "0px"
      });
    });

    $('.slideout-menu-close').on('click', function(event){
      var slideoutMenu = $('.slideout-menu');
    	var slideoutMenuWidth = $('.slideout-menu').width();

      slideoutMenu.animate({
        left: -slideoutMenuWidth
      }, 250);
    });

    $('.slideout-menu').animate({
      left: "0px"
    });

    // 
    // $('.van-small').on('click', function(event) {
    //   $(".van-small").attr("src", "starry_small.jpg");
    //   image.src = "wheat.jpeg"
    //   $('.van-small').removeClass(".van-small").addClass(".wheat-small").unbind("click")
    //   image.onload = function() {
    //     animate();
    //   }
    //
    //   $(".wheat-small").on('click', function(event) {
    //     $(".wheat-small").attr("src", "starry_small.jpg");
    //     image.src = "starry.jpg"
    //     $('.wheat-small').removeClass(".wheat-small").addClass(".van-small").unbind("click")
    //     image.onload = function() {
    //       animate();
    //     }
    //   });
    //
    //
    // });


}


function animate() {

      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;

      var board = new Board()

      for (var k = 0; k < 50; k++) {
        board.ants.push(new Ant(Math.round(Math.random() * board.cols), Math.round(Math.random() * board.rows), Math.round(Math.random()*3)));
        board.ants.push(new Ant(Math.round(Math.random() * board.cols), Math.round(Math.random() * board.rows), Math.round(Math.random()*3)));
      }

      $("#canvas").click(function(e){
          var x = e.pageX-$("#canvas").offset().left;
          var y = e.pageY-$("#canvas").offset().top;

          board.clicks.push([x,y,0]);
      });


      ctx.drawImage(image, 0, 0, image.width, image.height);


        var size = 25 / 100,
         w = canvas.width * size,
         h = canvas.height * size;
         console.log("hello");
        ctx.drawImage(image, 0, 0, w, h);

        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

      board.start();

}
