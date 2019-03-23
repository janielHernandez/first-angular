import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  cursos: string[] = ['java', 'javascript', 'typescript', 'html', 'css', 'bootstrap'];
  habilitarCursos = false;
  onClickHabilitarCursos(): void {
    this.habilitarCursos = !this.habilitarCursos;
  }
  constructor() { }
}
