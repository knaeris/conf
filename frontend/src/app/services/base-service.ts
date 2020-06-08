import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl = 'https://localhost:8443/';

  constructor(private http: HttpClient) {

  }

  public get(url: string, params?: any): Observable<any> {
    return this.http.get(this.apiUrl + url, params)
      .pipe(map((response: any) => response));
  }

  public post(url: string, params?: any): Observable<any> {
    return this.http.post(this.apiUrl + url, params)
      .pipe(map((response: any) => response));
  }

  public postWithHeaders(url: string, params: any, headers?: any): Observable<any> {
    return this.http.post(this.apiUrl + url, params, headers)
      .pipe(map((response: any) => response));
  }

  public put(url: string, params?: any): Observable<any> {
    return this.http.put(this.apiUrl + url, params)
      .pipe(map((response: any) => response));
  }

  public delete(url: string, params?: any): Observable<any> {
    return this.http.delete(this.apiUrl + url, params)
      .pipe(map((response: any) => response));
  }
}
