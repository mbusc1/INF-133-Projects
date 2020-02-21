import { Component, OnInit, Input } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import { TrackData } from '../../data/track-data';
import { TrackFeature } from '../../data/track-feature';


@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
    @Input() trackId:string;
    @Input() aud:TrackFeature;
    audioFeatures:TrackFeature[];


    constructor(private spotify:SpotifyService) { }

  ngOnInit() {
      let trk_data = this.spotify.getAudioFeaturesForTrack(this.trackId);
      let new3_data = trk_data.then((t_data) =>{
          this.audioFeatures = t_data;
      });

  }

}
