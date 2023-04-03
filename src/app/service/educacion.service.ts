import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public agregarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/agregar`, educacion);
  }

  public verEducaciones(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/ver`);
  }

  public editarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/editar`, educacion);
  }

  public borrarEducacion(id: number): Observable<Educacion> {
    return this.http.delete<Educacion>(`${this.apiServerUrl}/educacion/borrar/${id}`);
  }
}
