function parseTweets(runkeeper_tweets) {
    //Do not proceed if no tweets loaded
    if (runkeeper_tweets === undefined) {
        window.alert('No tweets returned');
        return;
    }

    tweet_array = runkeeper_tweets.map(function (tweet) {
        return new Tweet(tweet.text, tweet.created_at);
    });

    //This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
    //It works correctly, your task is to update the text of the other tags in the HTML file!
    $('#numberTweets').text(tweet_array.length);


    //start of my code

    // tweet dates (1 point)
    //from lecture 5 and mozilla article linked: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    //edit start date
    let start_date = tweet_array[0].time;
    tweet_array.forEach(function (item) {
        if (item.time < start_date) {
            start_date = item.time;
        }
    });
    $('#firstDate').text(start_date.toLocaleDateString('en-EN', options));

    //edit end date
    let end_date = tweet_array[0].time;
    tweet_array.forEach(function (item) {
        if (item.time > end_date) {
            end_date = item.time;
        }
    });
    $('#lastDate').text(end_date.toLocaleDateString('en-EN', options));


    //tweet categories (1 point)

    //mathematical calculations:
    var live_events = 0;
    var completed_events = 0;
    var achievements = 0;
    var miscs = 0;
    tweet_array.forEach(function (item) {
        if (item.source === 'completed_event') {
            completed_events++;
        } else if (item.source === 'achievement') {
            achievements++;
        } else if (item.source === 'live_event') {
            live_events++;
        } else {
            miscs++;
        }
    });
    var total = live_events + completed_events + achievements + miscs;

    var live_per = live_events / total;
    var ach_per = achievements / total;
    var comp_per = completed_events / total;
    var misc_per = miscs / total;


    //used w3
    //https://www.w3schools.com/jquery/sel_class.asp
    $('.completedEvents').text(completed_events.toString());
    $('.completedEventsPct').text(math.format(comp_per * 100, {notation: 'fixed', precision: 2}).toString() + '%');

    $('.liveEvents').text(live_events.toString());
    $('.liveEventsPct').text(math.format(live_per * 100, {notation: 'fixed', precision: 2}).toString() + '%');

    $('.achievements').text(achievements.toString());
    $('.achievementsPct').text(math.format(ach_per * 100, {notation: 'fixed', precision: 2}).toString() + '%');

    $('.miscellaneous').text(miscs.toString());
    $('.miscellaneousPct').text(math.format(misc_per * 100, {notation: 'fixed', precision: 2}).toString() + '%');


    //User-written tweets (1 point)
    var writs = 0;

    tweet_array.forEach(function (item) {
        if (item.written) {
            writs++;
        }
    });
    var wri_per = writs / completed_events;

    $('.written').text(writs.toString());
    //$('.written').text(tweet_array[0].activityType); test debug statement
    $('.writtenPct').text(math.format(wri_per * 100, {notation: 'fixed', precision: 2}).toString() + '%');

}




//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});




