import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-movies-new',
  templateUrl: './movies-new.component.html',
  styleUrls: ['./movies-new.component.scss']
})
export class MoviesNewComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  movieTitle: string;
  name: string;
  stars: string;
  review: string;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  movieTitleControl = new FormControl('', [
    Validators.required
  ]);
  descFormControl = new FormControl('', [
    Validators.required
  ]);

  starsFormControl = new FormControl('', [Validators.required]);
  starz = [
    {name: '1 star', value: '1'},
    {name: '2 stars', value: '2'},
    {name: '3 stars', value: '3'},
    {name: '4 stars', value: '4'},
    {name: '5 stars', value: '5'}
  ];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  addMovie() {
    const data = {
      title: this.movieTitle,
      name: this.name,
      stars: this.stars,
      content: this.review
    };
    console.log(data);
    const observable = this.httpService.create(data);
    observable.subscribe(returnData => {
      console.log('New movie and review added: ', returnData);
      window.location.href = '/';
    });
  }

}
