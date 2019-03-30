import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {Router, ActivatedRoute} from '@angular/router';
import {log} from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private c: Client = new Client();
  private errors: string[];
  private title = 'Create client';
  constructor(private clientService: ClientService,
              private routers: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.chargeClient();
  }

  chargeClient(): void {
      this.activatedRoute.params.subscribe(
        params => {
          const id = params[ 'id' ];
          if ( id ) {
            this.clientService.getClient(id).subscribe(
              client => this.c = client
            );
          }
        }
      );
  }

  public create(): void {

    log(this.c);
    this.clientService.create(this.c).subscribe(
        client => {
          this.routers.navigate(['/clients']);
          Swal.fire('New Client', `Client ${client.name} was created successfully`, 'success');
        },
      errors => {
            this.errors = errors.error.error as string[];
            log('code of status ' + errors.status);
            log(errors.error.error);
      }
    );
  }

  public update() {
    this.clientService.update(this.c).subscribe(
      client => {
        this.routers.navigate(['/clients']);
        Swal.fire('Client Update', `Client ${client.name} was updated successfully`, 'success');
      }
    );
  }
}
