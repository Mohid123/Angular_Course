import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs'; //parts of rxjs library can be imported not the whole library
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private procesHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.procesHTTPMsgService.handleError));
  }

//OLD CODE
//return of(LEADERS).pipe(delay(2000)); //Whatever a promise does, Observable can do as well and make code smaller

// USING of FROM rxjs TO CREATE PROMISE WITHOUT USING OBSERVABLE.
  // getLeaders(): Promise<Leader[]> {
  //   return of(LEADERS).pipe(delay(2000)).toPromise();    

// OLD CODE APPROACH
   // return new Promise (
   //    resolve => {
   //      //simulate server latency with 2s delay using setTimeout
   //      setTimeout(() => resolve(LEADERS), 2000);
   //    }); 

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.procesHTTPMsgService.handleError));
  }

//OLD CODE
  //return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));

    // return new Promise (
   //    resolve => {
   //      setTimeout(() => resolve(LEADERS.filter((lead) => (lead.id === id))[0]), 2000);
   //    });

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.procesHTTPMsgService.handleError));
  }

//OLD CODE
  //return of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));

    // return new Promise(
   //    resolve => {
   //      setTimeout(() => resolve(LEADERS.filter((lead) => lead.featured)[0]), 2000);
   //    });

   getleaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)));
  }
}
