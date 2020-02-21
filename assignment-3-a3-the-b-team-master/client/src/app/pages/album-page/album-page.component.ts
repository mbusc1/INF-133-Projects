import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute,private spotify:SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
      let alb_data = this.spotify.getAlbum(this.albumId);
      let new3_data = alb_data.then((a_data) =>{
          this.album = a_data;
      });

      let trk_data = this.spotify.getTracksForAlbum(this.albumId);
      let new4_data = trk_data.then((t_data) =>{
          this.tracks = t_data;
      });
  }

}
