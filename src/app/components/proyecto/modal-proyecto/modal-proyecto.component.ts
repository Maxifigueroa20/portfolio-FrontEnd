import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ALPHANUMERIC_PATTERN, NUMBER_PATTERN, TITLE_PATTERN, URL_PATTERN } from 'src/app/helpers/utils';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-modal-proyecto',
  templateUrl: './modal-proyecto.component.html',
  styleUrls: ['./modal-proyecto.component.css']
})
export class ModalProyectoComponent implements OnInit{
  @Input() proyecto: Proyecto = {
    idProyecto: 0,
    tituloProyecto: "",
    fechaInicioProyecto: 0,
    fechaFinProyecto: 0,
    descripcionProyecto: "",
    imagenProyecto: "",
    urlProyecto: ""
  }

  @Input() modalMode: string = "";

  modalForm: FormGroup;

  constructor(
    private proyectoService: ProyectoService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      idProyecto: [this.proyecto.idProyecto],
      tituloProyecto: [this.proyecto.tituloProyecto, [Validators.required, Validators.pattern(TITLE_PATTERN)]],
      fechaInicioProyecto: [this.proyecto.fechaInicioProyecto, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      fechaFinProyecto: [this.proyecto.fechaFinProyecto, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      descripcionProyecto: [this.proyecto.descripcionProyecto, [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)]],
      imagenProyecto: [this.proyecto.imagenProyecto, [Validators.required, Validators.pattern(URL_PATTERN)]],
      urlProyecto: [this.proyecto.urlProyecto, [Validators.required, Validators.pattern(URL_PATTERN)]]
    })
  }

  ngOnInit(): void {
    this.modalForm.patchValue(this.proyecto);
  }

  cerrarModal() {
    this.activeModal.close();
  }

  onCreate() {
    this.proyecto = this.modalForm.value;
    this.proyectoService.agregarProyecto(this.proyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

  onEdit() {
    this.proyecto = this.modalForm.value;
    this.proyectoService.editarProyecto(this.proyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

  onDelete() {
    this.proyectoService.borrarProyecto(this.proyecto.idProyecto).subscribe(() => {
      this.activeModal.close();
    });
  }

  get Titulo() {
    return this.modalForm.get('tituloProyecto');
  }

  get FechaInicio() {
    return this.modalForm.get('fechaInicioProyecto');
  }

  get FechaFin() {
    return this.modalForm.get('fechaFinProyecto');
  }

  get Descripcion() {
    return this.modalForm.get('descripcionProyecto');
  }

  get Imagen() {
    return this.modalForm.get('imagenProyecto');
  }

  get Url() {
    return this.modalForm.get('urlProyecto');
  }
}
