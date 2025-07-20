import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  sendRegisterData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signUp`,

      data
    );
  }

  sendLoginData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signIn`,

      data
    );
  }

  userLogOut(): void {
    // jwt null
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
