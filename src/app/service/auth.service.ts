import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(creds: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/authenticate`, creds).pipe(map((response: any) => {

      const token = response.token;
      const role = response.role;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      return response;
    }))
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public getRole() {
    return sessionStorage.getItem('role');
  }

  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }

  public isAdmin() {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
