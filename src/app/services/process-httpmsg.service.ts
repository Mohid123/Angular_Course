import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) { //handleError method
  	let errMsg: string;

  	if(error.error instanceof ErrorEvent) {
  		errMsg = error.error.message;
  	}
  	else {
  		errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`
  	}

  	return throwError(errMsg);
  }
}
