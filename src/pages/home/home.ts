import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DetailsPage } from "../details/details";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  results: Movie[];
  pushPage: any;

  constructor(public navCtrl: NavController) {
    this.results = [];
    this.pushPage = DetailsPage;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.results = fakeMovies;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.results = this.results.filter(item => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
    if (val.trim() == ""){
      this.results = [];
    }
  }
  // goToOtherPage() {
  //   //push another page onto the history stack
  //   //causing the nav controller to animate the new page in
  //   this.navCtrl.push(DetailsPage);
  // }
}

export interface Movie {
  title: string;
  director: string;
  date: string;
  image: string;
}

const fakeMovies: Movie[] = [
  {
    title: "The Lord of the Rings",
    director: "Peter Jackson",
    date: "18-12-2001",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/bi9JddwTwBt3ixGLAiMAF7OXMbV.jpg"
  },
  {
    title: "Star Wars IV : A New Hope",
    director: "Georges Lucas",
    date: "25-05-1977",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg"
  },
  {
    title: "Star Wars VIII : The Last Jedi",
    director: "Georges Lucas",
    date: "13-12-2017",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg"
  }
];