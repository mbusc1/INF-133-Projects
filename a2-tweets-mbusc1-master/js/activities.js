function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//used w3schools on objects
	//https://www.w3schools.com/js/js_objects.asp
	//https://www.w3schools.com/js/js_json_objects.asp
    let dist = 0;
    let ats = {' run ':0}; //activities set run as one of the activities as default
    let ats_dist = {' run ':0};
    let lenats = 0;
    let completed_events = 0;
    let first = 0;
	let second = 0;
	let third = 0;

    let first_s = "";
    let second_s = "";
    let third_s = "";

    let longest = 0;
    let longest_at = "";

    let shortest = 30000; //the earth is only 24k miles long so this seems plenty large https://www.google.com/search?q=how+many+miles+long+is+the+earth&rlz=1C1CHWL_enUS822US822&oq=how+many+miles+long+is+the+earth&aqs=chrome..69i57j0l3.4169j1j1&sourceid=chrome&ie=UTF-8
    let shortest_at = "";

    tweet_array.forEach(function (item) {
        if (item.source === 'completed_event') {
            completed_events++;
            //get activity types
            if(item.activityType in ats){
                ats[item.activityType]++;
			}else{
                ats[item.activityType] = 1;
			}

            //get activity max distances
            //if in dictionary
            if(item.activityType in ats_dist){
                //if current value larger
                if (item.distance > ats_dist[item.activityType]){
                    ats_dist[item.activityType] = item.distance
                }
                //or do nothing
                //or create a new key
            }else{
                ats_dist[item.activityType] = item.distance;
            }


			}

        });
    for(at in ats){
    	//console.log(at); //debugs
		//console.log(ats[at]);
    	lenats++;

    	if (ats[at] > first){
    		first = ats[at];
			first_s = at;
    	}

        if (first > ats[at] > second){
            second = ats[at];
            second_s = at;
        }

        if (second > ats[at] > third){
            third = ats[at];
            third_s = at;
        }
	}


    //console.log(first_s); //debugs
    //console.log(ats_dist[first_s]);

    if (ats_dist[first_s] > longest){
        longest = ats_dist[first_s];
        longest_at = first_s
    }

    if (ats_dist[first_s] < shortest){
        shortest = ats_dist[first_s];
        shortest_at = first_s;
    }

    //console.log(second_s); //debugs
    //console.log(ats_dist[second_s]);

    if (ats_dist[second_s] > longest){
        longest = ats_dist[second_s];
        longest_at = second_s
    }

    if (ats_dist[second_s] < shortest){
        shortest = ats_dist[second_s];
        shortest_at = second_s;
    }

    //console.log(first_s); //debugs
    //console.log(ats_dist[first_s]);

    if (ats_dist[third_s] > longest){
        longest = ats_dist[third_s];
        longest_at = third_s
    }

    if (ats_dist[third_s] < shortest){
        shortest = ats_dist[third_s];
        shortest_at = third_s;
    }

    //calculate length averages
    let weekday = [];
    let weekend = [];
    tweet_array.forEach(function (item) {

        if (item.source === 'completed_event') {
        	if (item.time.toLocaleDateString('en-EN', {weekday:'long'}) in {'Saturday':0,'Sunday':0}){
                weekend.push(item.distance);
			}
        	else{
                weekday.push(item.distance);
			}

        }
    });


    //w3schools reduce function
    //https://www.w3schools.com/jsref/jsref_reduce.asp
	let wtotal = function(week){
		let total = 0;
        week.forEach(function (day) {
        	total += day;
		});
		return total
	};



    let wd_avg = wtotal(weekday) / weekday.length;
	let we_avg = wtotal(weekend) / weekend.length;

	//console.log(wd_avg); //debugs
	//console.log(we_avg);


    //$('#numberActivities').text(math.format(dist, {notation: 'fixed', precision: 2}).toString()+" mi"); //debug statement for dist
    //$('#numberActivities').text(at); //debug statement for activity type (at)
    $('#numberActivities').text(lenats.toString());

    $('#firstMost').text(first_s);
    $('#secondMost').text(second_s);
    $('#thirdMost').text(third_s);

    $('#longestActivityType').text(longest_at);
    $('#shortestActivityType').text(shortest_at);

    if (wd_avg > we_avg){
        $('#weekdayOrWeekendLonger').text('weekdays');
	} else {
        $('#weekdayOrWeekendLonger').text('weekends');
    }


    //generate graphs
	// type per tweet graph

	let ats_array = [];
    for (item in ats){
    	ats_array.push({'Activity Types':item,'Tweets per Type':ats[item]})
	}

	//console.log(ats_array);//debug
    activity_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
        "description": "A graph of the number of Tweets containing each type of activity.",
        "data": {
            "values":ats_array
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "Activity Types", "type": "ordinal"},
            "y": {"field": "Tweets per Type", "type": "quantitative"}
        }
    };
    vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

    //TODO: create the visualizations which group the three most-tweeted activities by the day of the week.

    //activities per day graph


    let ats_dist_array = [];
    tweet_array.forEach(function (item) {
        if (item.source === 'completed_event') {
            if (item.activityType === first_s) {
                ats_dist_array.push({
                'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                'Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                'Activity Type': item.activityType
                })
            }

            if (item.activityType === second_s) {
                ats_dist_array.push({
                    'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                    'Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                    'Activity Type': item.activityType
                })
            }

            if (item.activityType === third_s) {
                ats_dist_array.push({
                    'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                    'Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                    'Activity Type': item.activityType
                })
            }

        }
        });
    //console.log(ats_dist_array);//debug
    distance_vis_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A scatterplot showing distance of activity by day of the week performed.",
        "data": { "name":"distplot","values":ats_dist_array },
        "mark": "point",
        "encoding": {
            "x": {"field": "Day of the week", "type": "ordinal"},
            "y": {"field": "Distance", "type": "quantitative"},
            "color": {"field": "Activity Type", "type": "nominal"}
        }
    };

    vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

    //activities per day mean graph
    let ats_dist_array_mean = [];
    tweet_array.forEach(function (item) {
        if (item.source === 'completed_event') {
            if (item.activityType === first_s) {
                ats_dist_array_mean.push({
                    'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                    'Average Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                    'Activity Type': item.activityType
                })
            }

            if (item.activityType === second_s) {
                ats_dist_array_mean.push({
                    'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                    'Average Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                    'Activity Type': item.activityType
                })
            }

            if (item.activityType === third_s) {
                ats_dist_array_mean.push({
                    'Day of the week': item.time.toLocaleDateString('en-EN', {weekday: 'long'}),
                    'Average Distance': math.format(item.distance, {notation: 'fixed', precision: 2}),
                    'Activity Type': item.activityType
                })
            }

        }
    });
    //console.log(ats_dist_array_mean);//debug
    distance_vis_agg_spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "description": "A scatterplot showing distance of activity by day of the week performed by average.",
        "data": { "values":ats_dist_array_mean },
        "mark": "point",
        "encoding": {
            "x": {"field": "Day of the week", "type": "ordinal"},
            "y": {"aggregate": "mean", "field": "Average Distance", "type": "quantitative"},
            "color": {"field": "Activity Type", "type": "nominal"}
        }
    };

    //used lecture on DOM
    //https://inf133-fa19.depstein.net/assets/lectures/10_15_19-dom_package.pdf
    let toggl = true;
    $('#aggregate').click(function(event) {
        if (toggl){
            $('#aggregate').text('Show all activities');
            vegaEmbed('#distanceVis', distance_vis_agg_spec, {actions:false});
            toggl = false;
        }
        else{
            $('#aggregate').text('Show means');
            vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
            toggl = true;
        }
    });




}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});