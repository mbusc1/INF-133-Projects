import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotify:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
      let prof_data = this.spotify.getArtist(this.artistId);
      let new_data = prof_data.then((p_data) =>{
          this.artist = p_data;
      });
      let sim_data = this.spotify.getRelatedArtists(this.artistId);
      let new2_data = sim_data.then((s_data) =>{
          this.relatedArtists = s_data;
      });
      let alb_data = this.spotify.getAlbumsForArtist(this.artistId);
      let new3_data = alb_data.then((a_data) =>{
          this.albums = a_data;
      });

      let trk_data = this.spotify.getTopTracksForArtist(this.artistId);
      let new4_data = trk_data.then((t_data) =>{
          this.topTracks = t_data;
      });




  }

}