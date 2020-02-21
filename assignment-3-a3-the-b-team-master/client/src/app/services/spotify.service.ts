import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArtistData} from '../data/artist-data';
import {AlbumData} from '../data/album-data';
import {TrackData} from '../data/track-data';
import {ResourceData} from '../data/resource-data';
import {ProfileData} from '../data/profile-data';
import {TrackFeature} from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
      //used: https://angular.io/guide/http
      return this.http.get(this.expressBaseUrl+endpoint).toPromise();

  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

      //info for searching with spotify api
      //https://developer.spotify.com/documentation/web-api/reference/search/search/
      //https://www.w3schools.com/js/js_arrays.asp used for array manipulation
      return this.sendRequestToExpress("/search/" + category + "/" + encodeURIComponent(resource)).then((data) => {
        let ret = data;
        let ret_array = [];
        //console.log(ret);

        if(category == "artist"){
          for(let art in ret.artists.items) {
            //console.log(ret.artists.items[art]);
            ret_array.push(new ArtistData(ret.artists.items[art]));
          }
        }
        else if(category == "album"){
            for(let art in ret.albums.items) {
                //console.log(ret.albums.items[art]);
                ret_array.push(new AlbumData(ret.albums.items[art]));
            }
          }
        else if(category == "track"){
            for(let art in ret.tracks.items) {
                //console.log(ret.tracks.items[art]);
                ret_array.push(new TrackData(ret.tracks.items[art]));
            }
        }
        //console.log(ret_array);
        return ret_array
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
      return this.sendRequestToExpress("/artist/" +  encodeURIComponent(artistId)).then((data) => {
        //console.log(data);
        return new ArtistData(data)
      });

  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
      return this.sendRequestToExpress("/artist-related-artists/" +  artistId).then((data) => {
          //console.log(data)
          return data.artists;
      });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
      return this.sendRequestToExpress("/artist-top-tracks/" +  artistId).then((data) => {
          console.log(data)
          return data.tracks;
      });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
      return this.sendRequestToExpress("/artist-albums/" +  artistId).then((data) => {
          //console.log(data);
          return data.items;
      });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
      return this.sendRequestToExpress("/album/" +  encodeURIComponent(albumId)).then((data) => {
          //console.log(data);
          return new AlbumData(data);
  });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
      return this.sendRequestToExpress("/album-tracks/" +  encodeURIComponent(albumId)).then((data) => {
          //console.log(data);
          let ret_array = [];
          for(let art in data.items) {
            //console.log(art)
              //console.log(ret.tracks.items[art]);
              ret_array.push(new TrackData(data.items[art]));
          }
          return ret_array
      });
  }


  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
      return this.sendRequestToExpress("/track/" +  encodeURIComponent(trackId)).then((data) => {
        //console.log(data);
        return new TrackData(data);
      });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
      return this.sendRequestToExpress("/track-audio-features/" +  trackId).then((data) => {
          console.log(data);
          return data.items;
      });
  }
}
