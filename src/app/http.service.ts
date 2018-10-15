import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Create
  create(data) {
    return this.http.post('/new', data);
  }

  createReview(id, data) {
    return this.http.post('/review/' + id, data);
  }

  // Read
  read() {
    return this.http.get('/get');
  }

  readReview(id) {
    return this.http.get('/movies/' + id);
  }

  // Update

  // Delete
  deleteMovie(id) {
    return this.http.post('/remove/' + id, false);
  }
}
