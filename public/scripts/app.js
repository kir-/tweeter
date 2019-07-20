/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function() {
  $(document).scroll(function() {
    if ($(document).scrollTop() > 0) {
      $("#mybutton").css("display","block");
    } else {
      $("#mybutton").css("display","none");
    }
  });

  $("#arrowdown").click(function() {
    console.log($(document).scrollTop());
    $(document).scrollTop(890);
  });

  $("#mybutton").click(function() {
    $(document).scrollTop(0);
  });

  const createTweetElement = function(data) {
    let htmlTweet =
    `<article class="tweet">
    <header>
    <img src=${data.user.avatars}></img>
    <span class="name">${data.user.name}</span>
    <span class="username">${data.user.handle}</span>
    </header>
    ${$("<div>").text(data.content.text).html()}
    <footer>${moment(data.created_at).fromNow()}</footer>
    </article>`;

    return htmlTweet;
  };

  const loadtweets = function(cb) {
    $('#tweet-container').empty();
    $.get("/tweets/",(data)=>{
      cb(data);
    });
  };

  $('#btnTweet').click(function() {
    $('.new-tweet',function() {
      $('.new-tweet').slideToggle(300);
      if ($(".error-box").is(":visible")) {
        $(".error-box").slideToggle(300);
      }
    });
  });

  $('.new-tweet').submit((event)=>{
    event.preventDefault();
    if ($('textarea').val().length <= 140 && $('textarea').val().length > 0) {
      $(".error-box").css("display","none");
      $.post("/tweets/",$('textarea').serialize(),()=>{
        $('textarea').val('');
        loadtweets(renderTweets);
      });
    } else {
      if (!($(".error-box").is(":visible"))) {
        $(".error-box").slideToggle(300);
      }
    }
  });

  const renderTweets = function(data) {
    data.forEach(element => {
      $('#tweet-container').prepend(createTweetElement(element));
    });
  };

  loadtweets(renderTweets);
});