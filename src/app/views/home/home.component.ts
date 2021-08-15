import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/shared/model/categoria.model';
import { CursoModel } from 'src/app/shared/model/curso.model';
import { ApiService } from 'src/app/shared/service/api.service';


const ELEMENT_DATA: CursoModel[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'buttonEdit', 'delet'];
  dataSource = ELEMENT_DATA;
  categorias: CategoriaModel[] = [];
  cursoForm!: FormGroup;
  validator!: boolean;
  minDate = new Date();
  minDateTermino = new Date();
  selectedIndex = 0;
  dataDisabled = false;

  constructor(public service: ApiService, private fb: FormBuilder, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      categoria: ['', [Validators.required]],
      assunto: ['', [Validators.required]],
      datainicio: ['', [Validators.required]],
      datatermino: ['', [Validators.required]],
      qtdalunos: ['', [Validators.required]],
      id: ['']
    });
    this.init();
  }

  init() {
    this.dataDisabled = false;
    this.service.getCursos().subscribe(data => {
      this.dataSource = data;
    })
    this.service.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  compareDates(date: any) {
    let today = new Date()
    return date >= today ? true : false
  }

  onDateChange() {
    this.cursoForm.controls['datatermino'].setValue('')
    let data = this.cursoForm.controls['datainicio'].value;
    this.minDateTermino = new Date(data);
  }

  editar(element: any) {
    this.cursoForm = this.fb.group({
      categoria: [element.categoria.codigo, [Validators.required]],
      assunto: [element.assunto, [Validators.required]],
      datainicio: [element.datainicio, [Validators.required]],
      datatermino: [element.datatermino, [Validators.required]],
      qtdalunos: [element.qtdalunos, [Validators.required]],
      id: [element.id]
    });
    this.cursoForm.controls['datainicio'].setValidators(Validators.nullValidator);
    this.dataDisabled = true;
    this.selectedIndex = 1;
  }

  incluir() {
    if (this.cursoForm.valid) {
      this.service.getCategoriaById(this.cursoForm.controls['categoria'].value).subscribe(data => {
        const categoria = data
        const curso: CursoModel = {
          ...this.cursoForm.value
        }
        curso.categoria = categoria;
        if(this.cursoForm.value.id) {
          this.service.putCursos(curso).subscribe(data => {
            this.cursoForm.reset();
            this.selectedIndex = 0;
            this.init();
            alert("Curso Incluido com sucesso");
          },
            (err) => { alert(err.error); })
        } else {
          this.service.postCursos(curso).subscribe(data => {
            this.cursoForm.reset();
            this.selectedIndex = 0;
            this.init();
            alert("Curso Alterado com sucesso");
          },
            (err) => { alert(err.error); })
        }
      });
    }

  }

  cancelar() {
    this.cursoForm.reset();
    this.selectedIndex = 0;
    this.dataDisabled = false;
  }

  excluir(value: any) {
    this.service.deleteCursos(value).subscribe(data => {
      alert("Item Excluido com sucesso");
      this.init();
    },
    (err) => { alert(err.error); })
  }

}
