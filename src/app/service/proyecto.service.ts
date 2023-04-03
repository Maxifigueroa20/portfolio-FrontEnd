import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public agregarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiServerUrl}/proyecto/agregar`, proyecto);
  }

  public verProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiServerUrl}/proyecto/ver`);
  }

  public editarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiServerUrl}/proyecto/editar`, proyecto);
  }

  public borrarProyecto(id: number): Observable<Proyecto> {
    return this.http.delete<Proyecto>(`${this.apiServerUrl}/proyecto/borrar/${id}`);
  }
}
