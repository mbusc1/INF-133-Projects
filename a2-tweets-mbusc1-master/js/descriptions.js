

function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }
    let tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });


    //luis chavez helped me understand this
	//https://uci-inf133-fa19.slack.com/archives/CP5AQV9LZ/p1572500475183700?thread_ts=1572500193.183200&cid=CP5AQV9LZ
    $("#textFilter").on("input", function(event) {
        var into;
        into = document.getElementById('textFilter');
        //console.log(into.value);
        //console.log(writ_array);//debug


        let count = 1;
        //let tabrows = "";

        //console.log(writ_array)
        tweet_array.forEach(function (item) {
            //console.log(item);
            if (item.written) {
                if (item.writtenText.includes(into.value)) {
                    $("#tweetTable").append(item.getHTMLTableRow(count));
                    count++
                }
            }

        });

        //get only written tweets
        //console.log("<tbody>" + tabrows + "</tbody>");
        //console.log(count);
        //console.log(into.value);



        //use jquery to update doc
    	$("#searchCount").text = count.toString();
    	$("#searchText").text = into.value.toString();
   		//$("#tweetTable").html = "<tbody>"+tabrows.toString()+"</tbody>";

    });



}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);



});