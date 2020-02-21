import { Component, OnInit } from '@angular/core';
import {generate} from "rxjs";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private spotify: SpotifyService) {

  }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

    about_btn_callback() {
      var prof_data = this.spotify.aboutMe();
      //debug
      //console.log(prof_data);

      //kelly ngyuen suggested on slack to use an anonymous function to grab promise data
        // https://uci-inf133-fa19.slack.com/archives/CPU4XES64/p1573517025022500
      let new_data = prof_data.then((data) =>{
          this.name = data.name;
          this.profile_pic = data.imageURL;
          this.profile_link = data.spotifyProfile;
        });

    }



}
