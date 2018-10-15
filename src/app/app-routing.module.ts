import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MoviesComponent} from './movies/movies.component';
import {MoviesNewComponent} from './movies-new/movies-new.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {ReviewsNewComponent} from './reviews-new/reviews-new.component';

const routes: Routes = [
  {path: 'movies', component: MoviesComponent, children: [
      {path: 'new', component: MoviesNewComponent},
      {path: ':id', component: ReviewsComponent},
      {path: ':id/review', component: ReviewsNewComponent}
    ]},
  {path: '', redirectTo: 'movies', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
