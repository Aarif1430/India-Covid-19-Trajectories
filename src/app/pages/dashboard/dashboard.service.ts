import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable()
export class DashboardService {
    private jsonUrl = 'https://api.covid19india.org/states_daily.json';
    constructor(private http: Http) { }
    getCovidData(): Observable<any> {
        return this.http.get(this.jsonUrl).map((res: Response) => res.json()['states_daily']);
    }

  // error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purpose only
    return Promise.reject(error.body || error);
  }
}