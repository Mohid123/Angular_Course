import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs'; //parts of rxjs library can be imported not the whole library
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

 getPromotions(): Observable<Promotion[]> {
   return this.http.get<Promotion[]>(baseURL + 'promotions')
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }

//OLD CODE
  //return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise (
    //   resolve => {
    //     //simulate server latency with 2s delay using setTimeout
    //     setTimeout(() => resolve(PROMOTIONS), 2000);
    //   });

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

//OLD CODE
  //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    // return new Promise (
    //   resolve => {
    //     //simulate server latency with 2s delay using setTimeout
    //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    //   }); 

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

//OLD CODE
  //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
    // return new Promise (
    //   resolve => {
    //     //simulate server latency with 2s delay using setTimeout
    //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    //   });

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promotion => promotion.id)));
  }  
}
