$(".newQuote").on("click", () => {
  "use strict";

  const $quoteInput = $(".quote"),
        $citationInput = $(".citation");

  // make an API request to get a randomly generated quote
  $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    // call function if request succeeds
    success: (json) => {
      // deal with lsep issue - seen on quote from Apple
      const quote = json[0].content;
      const author = json[0].title;
      $quoteInput.html(quote);
      $citationInput.html(author);
      const tweet = getTweet();
      const $twtBtn = $(".tweetQuote");
//    if quote + citation length is 140 chrs or less, enable the tweet quote button
      if (tweet.length <= 140) {
        $twtBtn.prop("disabled", false);
      } else {
        $twtBtn.prop("disabled", true);
      }
    },
    // handle request failure
    error: () => {
      $quoteInput.html("Error");
      $citationInput.html("Sorry, something went wrong");
    },
    cache: false
  });

});

$(".tweetQuote").on("click", () => {
  "use strict";

  const tweet = getTweet();
  //   handle errors
  if (tweet === false) return;
  const link = "https://twitter.com/home?status=" + tweet;
  //   give user the option to tweet a quote
  window.open(link);

});

function getTweet () {
  "use strict";

//   return the quote + the citation
  const $quote = $(".quote").text(),
        $citation = $(".citation").text(),
        defaultMsg = "Click the button to get a quote about design!";
  if ($quote === "" || $quote === defaultMsg) return false;
  return '"' + $quote.trim() + '" ' + $citation;

}
