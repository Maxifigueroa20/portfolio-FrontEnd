import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from 'src/app/helpers/utils';
import { Habilidad } from 'src/app/model/habilidad';
import { AuthService } from 'src/app/service/auth.service';
import { HabilidadService } from 'src/app/service/habilidad.service';
import { ModalHabilidadComponent } from './modal-habilidad/modal-habilidad.component';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css']
})
export class HabilidadComponent {
  habilidades: Habilidad[] = []

  constructor(
    private authService: AuthService,
    private habilidadService: HabilidadService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.obtenerHabilidades();
  }

  obtenerHabilidades() {
    this.habilidadService.verHabilidades().subscribe(habilidades => {
      this.habilidades = habilidades;
    })
  }

  onCreate() {
    const modalRef = this.modalService.open(ModalHabilidadComponent, MODAL_OPTIONS)
    modalRef.componentInstance.modalMode = "agregar";
    modalRef.result.then(() => {
      this.obtenerHabilidades();
    });
  }

  onEdit(habilidad: Habilidad) {
    const modalRef = this.modalService.open(ModalHabilidadComponent, MODAL_OPTIONS)
    modalRef.componentInstance.habilidad = habilidad;
    modalRef.componentInstance.modalMode = "editar";
    modalRef.result.then(() => {
      this.obtenerHabilidades();
    });
  }

  onDelete(id: number) {
    const modalRef = this.modalService.open(ModalHabilidadComponent, MODAL_OPTIONS)
    modalRef.componentInstance.habilidad.idHabilidad = id;
    modalRef.componentInstance.modalMode = "borrar";
    modalRef.result.then(() => {
      this.obtenerHabilidades();
    });
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }
}
