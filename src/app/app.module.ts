import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { SliceComponent } from './slice/slice.component';
import { CursosComponent } from './cursos/cursos.component';
import { ClientComponent } from './client/client.component';
import {ClientService} from './client/client.service';
import {RouterModule, Route} from '@angular/router';

const routes: Route[] = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'courses', component: CursosComponent},
  {path: 'clients', component: ClientComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliceComponent,
    CursosComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
