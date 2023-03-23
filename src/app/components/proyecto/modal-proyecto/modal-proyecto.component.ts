import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-modal-proyecto',
  templateUrl: './modal-proyecto.component.html',
  styleUrls: ['./modal-proyecto.component.css']
})
export class ModalProyectoComponent {
  @Input() proyecto: Proyecto = {
    idProyecto: 0,
    tituloProyecto: "",
    fechaProyecto: "",
    descripcionProyecto: "",
    imagenProyecto: "",
    urlProyecto: ""
  }

  @Input() modalMode: string = "";

  constructor(
    private proyectoService: ProyectoService,
    private activeModal: NgbActiveModal
  ) {}

  cerrarModal() {
    this.activeModal.close();
  }

  onCreate() {
    this.proyectoService.agregarProyecto(this.proyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

  onEdit() {
    this.proyectoService.editarProyecto(this.proyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

  onDelete() {
    this.proyectoService.borrarProyecto(this.proyecto.idProyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

}
