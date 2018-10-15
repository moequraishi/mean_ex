import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  userId: string;
  reviewData;

  constructor(
    private activated: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit() {
    this.userId = this.activated.snapshot.paramMap.get('id');
    this.getReview();
  }

  getReview() {
    const ob = this.httpService.readReview(this.userId);
    ob.subscribe(data => {
      console.log('Got reviews: ', data);
      this.reviewData = data;
    });
  }

  deleteReview() {
    const ob = this.httpService.deleteMovie(this.userId);
    ob.subscribe(data => {
      console.log('Deleted review:', data);
      window.location.href = '/';
    });
  }

}
