import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movieData;

  constructor(public route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const ob = this.httpService.read();
    ob.subscribe(data => {
      this.movieData = data;

      console.log('Got data', this.movieData);
    });
  }

}
