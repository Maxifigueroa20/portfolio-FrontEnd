import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from 'src/app/helpers/utils';
import { Experiencia } from 'src/app/model/experiencia';
import { AuthService } from 'src/app/service/auth.service';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ModalExperienciaComponent } from './modal-experiencia/modal-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  experiencias: Experiencia[] = []

  constructor(
    private authService: AuthService,
    private experienciaService: ExperienciaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.obtenerExperiencias();
  }

  obtenerExperiencias() {
    this.experienciaService.verExperiencias().subscribe(experiencias => {
      this.experiencias = experiencias;
    })
  }

  onCreate() {
    const modalRef = this.modalService.open(ModalExperienciaComponent, MODAL_OPTIONS)
    modalRef.componentInstance.modalMode = "agregar";
    modalRef.result.then(() => {
      this.obtenerExperiencias();
    });
  }

  onEdit(experiencia: Experiencia) {
    const modalRef = this.modalService.open(ModalExperienciaComponent, MODAL_OPTIONS)
    modalRef.componentInstance.experiencia = experiencia;
    modalRef.componentInstance.modalMode = "editar";
    modalRef.result.then(() => {
      this.obtenerExperiencias();
    });
  }

  onDelete(id: number) {
    const modalRef = this.modalService.open(ModalExperienciaComponent, MODAL_OPTIONS)
    modalRef.componentInstance.experiencia.idExperiencia = id;
    modalRef.componentInstance.modalMode = "borrar";
    modalRef.result.then(() => {
      this.obtenerExperiencias();
    });
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }
}
