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

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      return response;
    }))
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getRole() {
    return localStorage.getItem('role');
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  public isAdmin() {
    return this.getRole() === 'ROLE_ADMIN';
  }
}
