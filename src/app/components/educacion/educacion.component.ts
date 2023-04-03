import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from 'src/app/helpers/utils';
import { Educacion } from 'src/app/model/educacion';
import { AuthService } from 'src/app/service/auth.service';
import { EducacionService } from 'src/app/service/educacion.service';
import { ModalEducacionComponent } from './modal-educacion/modal-educacion.component';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  educaciones: Educacion[] = []

  constructor(
    private authService: AuthService,
    private educacionService: EducacionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.obtenerEducaciones();
  }

  obtenerEducaciones() {
    this.educacionService.verEducaciones().subscribe(educaciones => {
      this.educaciones = educaciones;
    })
  }

  onCreate() {
    const modalRef = this.modalService.open(ModalEducacionComponent, MODAL_OPTIONS)
    modalRef.componentInstance.modalMode = "agregar";
    modalRef.result.then(() => {
      this.obtenerEducaciones();
    });
  }

  onEdit(educacion: Educacion) {
    const modalRef = this.modalService.open(ModalEducacionComponent, MODAL_OPTIONS)
    modalRef.componentInstance.educacion = educacion;
    modalRef.componentInstance.modalMode = "editar";
    modalRef.result.then(() => {
      this.obtenerEducaciones();
    });
  }

  onDelete(id: number) {
    const modalRef = this.modalService.open(ModalEducacionComponent, MODAL_OPTIONS)
    modalRef.componentInstance.educacion.idEducacion = id;
    modalRef.componentInstance.modalMode = "borrar";
    modalRef.result.then(() => {
      this.obtenerEducaciones();
    });
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }
}
