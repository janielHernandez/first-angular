import { Injectable } from '@angular/core';
import {CLIENTS} from './client.json';
import {Client} from './client';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor() { }
  getClients(): Observable<Client[]> {
    return of(CLIENTS);
  }
}
