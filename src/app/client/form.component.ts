import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private c: Client = new Client();
  private title = 'Create client';
  constructor(private clientService: ClientService, private routers: Router) { }

  ngOnInit() {
  }

  public create() {

    log(this.c);
    this.clientService.create(this.c).subscribe(
        response => this.routers.navigate(['/clients'])
    );
  }
}
