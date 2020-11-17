import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  private urlEndPoint: string = environment.baseURL + '/persons';

  constructor(
    private http: HttpClient
  ) { }

  getAllPersons(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }

  createPerson(person: Person): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, person);
  }

}