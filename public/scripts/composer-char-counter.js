$(document).ready(function() {
  $(".new-tweet textarea").on("input",function() {
    if(140 - $(".new-tweet textarea").val().length < 0) {
      $(".new-tweet span").css('color', 'red');
    } else {
      $(".new-tweet span").css('color', 'inherit');
    }
    $(".new-tweet span").text(140 - $(".new-tweet textarea").val().length);
  });
});




