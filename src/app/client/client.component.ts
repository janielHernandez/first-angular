import { Component, OnInit } from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import Swal from 'sweetalert2';
import {log} from 'util';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];
  private errors: string[];
  constructor(private  clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

  delete(client: Client): void {
    this.clientService.delete(client.id).subscribe(
      response => {
        this.clients = this.clients.filter(cli => cli !== client);
        Swal.fire('Delete', `Client ${client.name} was deleted successfully!`);
      }
    );
  }

  async popup(client: Client) {
    const {value: formValues} = await Swal.fire({
      title: 'Client ' + client.name,
      html:
        '<div class="container-fluid">' + '<hr/>' +
          '<div class="row justify-content-center">' +
              '<div class="col-3 text-left font-weight-bold"> Name: </div>' +
              '<div class="col-7">' + client.name + '</div>' +
          '</div>' +
          '<div class="row justify-content-center">' +
            '<div class="col-3 text-left font-weight-bold">Email: </div>' +
            '<div class="col-7">' + client.email + '</div>' +
          '</div>' +
          '<div class="row justify-content-center">' +
            '<div class="col-3 text-left font-weight-bold">Address: </div>' +
            '<div class="col-7">' + client.address + '</div>' +
          '</div>' +
        '</div>',
      focusConfirm: false,
      preConfirm: () => {
        return;
      }
    });
 }

}
