import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../model/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public agregarHabilidad(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.post<Habilidad>(`${this.apiServerUrl}/habilidad/agregar`, habilidad);
  }

  public verHabilidades(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(`${this.apiServerUrl}/habilidad/ver`);
  }

  public editarHabilidad(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.put<Habilidad>(`${this.apiServerUrl}/habilidad/editar`, habilidad);
  }

  public borrarHabilidad(id: number): Observable<Habilidad> {
    return this.http.delete<Habilidad>(`${this.apiServerUrl}/habilidad/borrar/${id}`);
  }
}
