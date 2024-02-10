import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthCredentials } from 'src/AuthCredentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Creates an instance of ApiService
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) { }

  userLoggenIn() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          let access: boolean = false;
          if (localStorage.getItem('userToken')) {
            var date = new Date();
            var expires_in = localStorage.getItem('expiry');
            if (localStorage.getItem("userToken")) {
              var expiry = new Date(expires_in);
              if (date.getTime() <= expiry.getTime())
                access = true;
            }
          }
          resolve(access);
        }, 0);
      }
    );
    return promise;
  }



  /**
   * Acquire Token
   */
  public acquireToken() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    });

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", AuthCredentials.UserName);
    urlencoded.append("apikey", AuthCredentials.APIKey);

    this.spinner.show();
    this.httpClient.post(environment.apiEndpoint + 'connect/token', urlencoded, { headers: reqHeader }).subscribe((response: any) => {
      localStorage.setItem('scope', response.scope);
      localStorage.setItem('userToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      localStorage.setItem('expiry', response.expires_in);
      this.spinner.hide();
    });
  }

}
