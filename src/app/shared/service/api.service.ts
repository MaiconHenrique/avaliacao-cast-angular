import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaModel } from '../model/categoria.model';
import { CursoModel } from '../model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getCategorias(): Observable<CategoriaModel[]> {
    return this.httpClient.get<CategoriaModel[]>(this.apiUrl + '/categorias');
  }

  public getCategoriaById(flag: string): Observable<CategoriaModel> {
    return this.httpClient.get<CategoriaModel>(this.apiUrl + '/categoria/' + flag);
  }

  public getCursos(): Observable<CursoModel[]> {
    return this.httpClient.get<CursoModel[]>(this.apiUrl + '/cursos');
  }

  public getCursoById(flag: string): Observable<CursoModel> {
    return this.httpClient.get<CursoModel>(this.apiUrl + '/curso/' + flag);
  }

  public postCursos(value: CursoModel): Observable<CursoModel> {
    return this.httpClient.post<any>(this.apiUrl + '/curso', value, this.httpOptions);
  }

  public putCursos(value: CursoModel): Observable<CursoModel> {
    return this.httpClient.put<any>(this.apiUrl + '/curso', value, this.httpOptions);
  }

  public deleteCursos(value: number): Observable<CursoModel> {
    return this.httpClient.delete<any>(this.apiUrl + '/curso/' + value);
  }
  
}
