import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private API_URL = 'http://localhost:8080/api/rickandmorty/characters';
  private API_URL_FILTER = '/filter';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get<any>(this.API_URL, {withCredentials: true});
  }

  filterCharacters(filters: { name?: string; status?: string; species?: string; type?: string; gender?: string }): Observable<any> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.species) params = params.set('species', filters.species);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.gender) params = params.set('gender', filters.gender);

    return this.http.get<any>(this.API_URL + this.API_URL_FILTER, { params, withCredentials: true });
  }

}
