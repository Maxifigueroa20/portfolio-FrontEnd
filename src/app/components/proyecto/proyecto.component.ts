import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from 'src/app/helpers/utils';
import { Proyecto } from 'src/app/model/proyecto';
import { AuthService } from 'src/app/service/auth.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ModalProyectoComponent } from './modal-proyecto/modal-proyecto.component';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{
  proyectos: Proyecto[] = []

  constructor(
    private authService: AuthService,
    private proyectoService: ProyectoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.proyectoService.verProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
    })
  }

  onCreate() {
    const modalRef = this.modalService.open(ModalProyectoComponent, MODAL_OPTIONS)
    modalRef.componentInstance.modalMode = "agregar";
    modalRef.result.then(() => {
      this.obtenerProyectos();
    });
  }

  onEdit(proyecto: Proyecto) {
    const modalRef = this.modalService.open(ModalProyectoComponent, MODAL_OPTIONS)
    modalRef.componentInstance.proyecto = proyecto;
    modalRef.componentInstance.modalMode = "editar";
    modalRef.result.then(() => {
      this.obtenerProyectos();
    });
  }

  onDelete(id: number) {
    const modalRef = this.modalService.open(ModalProyectoComponent, MODAL_OPTIONS)
    modalRef.componentInstance.proyecto.idProyecto = id;
    modalRef.componentInstance.modalMode = "borrar";
    modalRef.result.then(() => {
      this.obtenerProyectos();
    });
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }
}
