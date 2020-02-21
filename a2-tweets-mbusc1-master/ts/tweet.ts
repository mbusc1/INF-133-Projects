class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    // used w3schools on assignment: https://www.w3schools.com/jsref/jsref_startswith.asp
    get source():string {
        let result = '';
        if(this.text.startsWith("Just completed a")){
            result = 'completed_event';
        }
        else if(this.text.startsWith("Achieved a new personal record with")){
            result = 'achievement';
        }
        else if(this.text.startsWith("Just posted a")){
            result = 'live_event';
        }
        else {
            result = 'miscellaneous';
        }
        return result;
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.includes("Check it out!")){
            return false;
        }
        else if(this.text.includes("Watch")){
            return false;
        }
        else if(this.text.startsWith("level")){
            return false;
        }
        else {
            return true;
        }
    }


    //used w3schools js strings
    //https://www.w3schools.com/jsref/jsref_slice_string.asp
    //https://www.w3schools.com/jsref/jsref_obj_string.asp

    get writtenText():string {
        let txt="";
        if(!this.written) {
            return txt
        }else{
            let start = this.text.indexOf('-');
            let end = this.text.indexOf('keeper');
            txt = this.text.slice(start,end+6);
        }
        return txt
    }

    get activityType():string {
        let at="";
        let start=0; //default in case we dont find it
        let end=0;
        if (this.source != 'completed_event') {
            return "unknown";
        }
        else{
            if(this.text.includes('km')){
                start = this.text.indexOf('km');
            }else if (this.text.includes('mi')){
                start = this.text.indexOf('mi');
            }

            if (this.text.includes('-')){
                end = this.text.indexOf('-');
            }
            else{
                end = this.text.indexOf('with');
            }
            at = this.text.slice(start+2,end);
        }
        // special case
        // generic activity is called just 'activity'
        //we want to rename this to 'generic activity'


        return at;
    }

    //used w3schools to turn string into float
    //https://www.w3schools.com/jsref/jsref_parsefloat.asp
    get distance():number {
        let dist=0;
        let end=0; //default in case we dont find it
        if (this.source != 'completed_event') {
            return 0;
        }
        else{
            let start = this.text.indexOf('ted a');
            if(this.text.includes('km')){
                end = this.text.indexOf('km');
                //turn string into float and convert km to mi
                dist = parseFloat(this.text.slice(start+5,end))/1.609;
            }else if (this.text.includes('mi')){
                end = this.text.indexOf('mi');
                dist = parseFloat(this.text.slice(start+5,end));
            }
        }
        return dist;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr><td>"+rowNumber.toString()+"</td><td>"+this.activityType+"</td><td>"+this.writtenText.slice(0,this.writtenText.indexOf('http'))+"<a href='"+this.writtenText.slice(this.writtenText.indexOf('http'),-11)+"'>"+this.writtenText.slice(this.writtenText.indexOf('http'),-11)+"</a></td></tr>\n";
    }
}