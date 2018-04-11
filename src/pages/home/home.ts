import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { DetailsPage } from "../details/details";
import { Observable } from "rxjs/Observable";
import { AlertController } from 'ionic-angular';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import {Subscription} from "rxjs/Subscription"
import { Shake } from "@ionic-native/shake";
const apikey: string = "ebb02613ce5a2ae58fde00f4db95a9c1";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  private shakeSubscription: Subscription; 
  results: Observable<Movie[]>;
  pushPage: any;

  constructor(private shake : Shake, private platform : Platform, private alertCtrl: AlertController, public navCtrl: NavController, private http: HttpClient) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  ionViewDidEnter(){
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
    .switchMap(() => this.shake.startWatch())
    .switchMap(() => this.discoverMovies())
    .subscribe(movies => this.showRandomMovieAlert (movies));
  }
  ionViewWillLeave(){
    this.shakeSubscription.unsubscribe();
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.results = this.fetchResults(val);
    } else {
      this.results = Observable.of([]);
    }
  }

  fetchResults(search: string): Observable<Movie[]> {
    let url: string = "https://api.themoviedb.org/3/search/movie";

    let Params = new HttpParams();
    Params = Params.append("api_key", apikey);
    Params = Params.append("query", search);

    return this.http
      .get<Movie[]>(url, { params: Params, responseType: "json" })
      .pluck("results");
  }

  discoverMovies(): Observable<Movie[]> {
    let url: string = "https://api.themoviedb.org/3/discover/movie";

    let Params = new HttpParams();
    Params = Params.append("api_key", apikey);
    Params = Params.append("primary_release_year", "2018");

    return this.http
      .get<Movie[]>(url, { params: Params, responseType: "json" })
      .pluck("results");
  }

  showRandomMovieAlert(movies: Partial<Movie>[]): void {
    let random_movie = movies[Math.floor(Math.random()*movies.length)];
    let alert = this.alertCtrl.create({
      title: random_movie.original_title,
      subTitle: random_movie.overview,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage, {movie : random_movie}); 
          }
        }
      ]
    });
    alert.present();
    
  }
}

export interface Movie {
  poster_path: string;
  release_date: string;
  original_title: string;
  vote_average: string;
  overview: string;
}