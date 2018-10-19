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
  selector: 'app-reviews-new',
  templateUrl: './reviews-new.component.html',
  styleUrls: ['./reviews-new.component.scss']
})
export class ReviewsNewComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  movieId: string;

  name: string;
  stars: string;
  review: string;

  nameFormControl = new FormControl('', [
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

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private httpService: HttpService) { }


  ngOnInit() {
    this.movieId = this.activated.snapshot.paramMap.get('id');
  }

  newReview() {
    const reviewData = {
      name: this.name,
      stars: this.stars,
      content: this.review
    };

    const ob = this.httpService.createReview(this.movieId, reviewData);
    ob.subscribe(data => {
      console.log('Review created: ', data);
      this.router.navigate(['/movies/' + this.movieId]);
    });

  }

}
