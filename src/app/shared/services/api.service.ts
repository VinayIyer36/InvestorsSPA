import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthCredentials } from 'src/AuthCredentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Creates an instance of ApiService
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Http GET
   * @param url 
   * @returns GET observable
   */
  public get(url: string): Observable<any> {
    return this.httpClient.get(environment.apiEndpoint + url);
  }
}