import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortUrlService {
  url = 'https://api-ssl.bitly.com/v4/shorten';

  constructor(private http: HttpClient) {}

  getUrlShort(nombreUrl: string):Observable<any> {
    // const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + this.token})
    const body={
      long_url:nombreUrl
    }
    // return this.http.post(this.url, body,{headers:tokenHeader});
    return this.http.post(this.url, body);
  }
}


//Alternativa para capturar el error ya sea en el SERVICE o INTERCEPTOR

// return this.http.post(this.url, body).pipe(catchError((error: HttpErrorResponse)=>{
//   console.log(error);
//   return throwError(() => error);
// })