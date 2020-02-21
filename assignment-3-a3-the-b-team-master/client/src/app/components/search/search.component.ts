import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
      var search_data = this.spotifyService.searchFor(this.searchCategory,this.searchString);
      //debug
      //console.log(search_data);

      //kelly ngyuen suggested on slack to use an anonymous function to grab promise data
      // https://uci-inf133-fa19.slack.com/archives/CPU4XES64/p1573517025022500
      search_data.then((data) =>{
          this.resources = data;
      });
  }

}
