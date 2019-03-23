import { Injectable } from '@angular/core';
import {Client} from './client';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/first/client';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});
  constructor(private httpClient: HttpClient) { }
  getClients(): Observable<Client[]> {
    // return of(CLIENTS);
    return this.httpClient.get<Client[]>(this.url);
  }
  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, client, {headers: this.httpHeaders});
  }


}
