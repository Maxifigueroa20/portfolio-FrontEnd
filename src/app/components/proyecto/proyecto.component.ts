import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router,
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
    const modalRef = this.modalService.open(ModalProyectoComponent)
    modalRef.componentInstance.modalMode = "agregar";
    modalRef.result.then(() => {
      this.obtenerProyectos();
    });
  }

  onEdit(proyecto: Proyecto) {
    const modalRef = this.modalService.open(ModalProyectoComponent)
    modalRef.componentInstance.proyecto = proyecto;
    modalRef.componentInstance.modalMode = "editar";
  }

  onDelete(id: number) {
    const modalRef = this.modalService.open(ModalProyectoComponent)
    modalRef.componentInstance.proyecto.idProyecto = id;
    modalRef.componentInstance.modalMode = "borrar";
    modalRef.result.then(() => {
      this.obtenerProyectos();
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }

}
