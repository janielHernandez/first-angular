import { Injectable } from '@angular/core';
import {Client} from './client';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {log} from 'util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/first/client';
  private httpHeaders = new HttpHeaders({'content-type': 'application/json'});
  constructor(private httpClient: HttpClient, private routers: Router) { }
  getClients(): Observable<Client[]> {
    // return of(CLIENTS);
    return this.httpClient.get<Client[]>(this.url).pipe(
      map(
        response => {
          const clients = response as Client[];
          return clients.map(
            c => {
              c.name = c.name.toUpperCase();
              c.insertDate = formatDate(c.insertDate, 'dd/MM/yyyy', 'en-US');
              return c;
            }
          );
        }
      )
    );
  }
  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, client, {headers: this.httpHeaders}).pipe(
      catchError(
        e => {

          log(e.status);
          if (e.status === 400) {
            return throwError(e);
          }
          log(e.error.message);
          Swal.fire('create error', e.error.message, 'error');
          return throwError(e);
        }
      )
    );
  }

  getClient(id): Observable<Client> {
    return this.httpClient.get<Client>(`${this.url}/${id}`).pipe(
      catchError(
          e => {
            this.routers.navigate(['/clients']);
            log( e.error.message);
            Swal.fire('Client no found', e.error.message, 'error');
            return throwError(e);
          }
      )
    );
  }
  update(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${this.url}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError(
        e => {
          log(e.status);
          if (e.status === 400) {
            return throwError(e);
          }
          log(e.error.message);
          Swal.fire('update error', e.error.message, 'error');
          return throwError(e);
        }
      )
    );
  }

  delete(id: number): Observable<Client> {
    return this.httpClient.delete<Client>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(
        e => {
          log(e.error.message);
          Swal.fire('Delete error', e.error.message, 'error');
          return throwError(e);
        }
      )
    );
  }

}
