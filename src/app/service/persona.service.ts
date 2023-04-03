import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public agregarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiServerUrl}/persona/agregar`, persona);
  }

  public buscarPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiServerUrl}/persona/id/${id}`)
  }

  public verPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiServerUrl}/persona/ver`);
  }

  public editarPersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiServerUrl}/persona/editar`, persona);
  }

  public borrarPersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.apiServerUrl}/persona/borrar/${id}`);
  }
}
