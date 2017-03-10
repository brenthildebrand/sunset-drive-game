  $(document).ready(function() {
    
    var settings = {
      score: 0,
      time: 40000
    };
    
    var play = function(){
      
      settings.score = 0;
      $(".score").html("<em>" + settings.score + "</em>");
    
    var fallingColors = ["gold", "purple", "red", "navy", "black", "gold", "purple", "navy", "black", "red", " gold", "purple"];
      
    currentColor = 0;
    var first;
    var second;
    var third;

    function roadLines() {
      $(".road").append("<div class='skew current'></div>");
      $(".current").animate({
        "left": "20vh",
        "top": "300px",
        "height": "100px",
        "width": "80px",
        "borderBottomWidth": "60px"
      }, 3000, 'easeInExpo', function() {
        // done animating, remove
        $(this).remove();
      });
    }

    function falling() {
      var randomStart = Math.floor((Math.random() * 100) + 1);
      var randomEnd = Math.floor((Math.random() * 80) + 40);
      first = fallingColors[currentColor];

      if (currentColor < fallingColors.length) {
        currentColor = currentColor + 1;
      } else {
        currentColor = 0;
      }
      $(".sky").append("<div class='falling on' style='left:" + randomStart + "vw'><div class='falling_color' style='border-color:" + first + "'></div></div>");
      fallingDelete();
      $(".falling").animate({
        "bottom": "-40px",
        "left": randomEnd + "vw"
      }, 10000, "linear", function() {
        $(this).remove();
        if ($(this).hasClass("on")) {
          settings.score -= 1;
        }
        $(".score").html("<em>" + settings.score + "</em>");
      });
    }

    function iniate() {
      setInterval(roadLines, 300);
    }
    iniate();
    falling();
    var startFalling = setInterval(falling, 800);
    function fallingDelete() {
      $(".falling").unbind().click(function() {
        $(this).removeClass("on");
        $(this).remove();
        settings.score += 1;
        $(".score").html("<em>" + settings.score + "</em>");
      });
    }

        $(".score").animate({"border-color" : "red"}, settings.time, "linear");
    
    $(".time").animate({
      "width" : "100vw",
      "backgroundColor" : "red"
    }, settings.time, "linear", function() {
      var finalScore = settings.score;
      console.log(finalScore);
      $(".falling").removeClass("on");
      clearInterval(startFalling);
      $(".score").animate({
        "font-size" : "70px",
        "left" : "44vw",
        "bottom" : "55vh",
        "height" : "88px",
        "width" : "15vw",
        "border-color" : "white"
      }, 1300, "linear", function() {
        $(".play-again").fadeIn();
      });
    });
    
    $(".play-again").click(function(){
      
      $(".score").css({"font-size" : "35px" , "left" : "10px" , "bottom" : "20px" , "height" : "48px" , "width" : "auto" , "border-color" : "gold"});
      $(".play-again").css("display" , "none");
      $(".time").css({"width" : "0vw" , "background-color" : "gold"});
      $(".falling_color").remove();
      
      play();
    });
      
    };
    
    play();
    

  });