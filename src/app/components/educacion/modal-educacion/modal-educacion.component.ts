import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ALPHANUMERIC_PATTERN, NUMBER_PATTERN, TITLE_PATTERN, URL_PATTERN } from 'src/app/helpers/utils';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-modal-educacion',
  templateUrl: './modal-educacion.component.html',
  styleUrls: ['./modal-educacion.component.css']
})
export class ModalEducacionComponent {
  @Input() educacion: Educacion = {
    idEducacion: 0,
    tituloEducacion: "",
    fechaInicioEducacion: 0,
    fechaFinEducacion: 0,
    descripcionEducacion: "",
    imagenEducacion: "",
  }

  @Input() modalMode: string = "";

  modalForm: FormGroup;

  constructor(
    private educacionService: EducacionService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      idEducacion: [this.educacion.idEducacion],
      tituloEducacion: [this.educacion.tituloEducacion, [Validators.required, Validators.pattern(TITLE_PATTERN)]],
      fechaInicioEducacion: [this.educacion.fechaInicioEducacion, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      fechaFinEducacion: [this.educacion.fechaFinEducacion, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      descripcionEducacion: [this.educacion.descripcionEducacion, [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)]],
      imagenEducacion: [this.educacion.imagenEducacion, [Validators.required, Validators.pattern(URL_PATTERN)]]
    })
  }

  ngOnInit(): void {
    this.modalForm.patchValue(this.educacion);
  }

  cerrarModal() {
    this.activeModal.close();
  }

  onCreate() {
    this.educacion = this.modalForm.value;
    this.educacionService.agregarEducacion(this.educacion).subscribe(() => {
      this.activeModal.close();
    });
  }

  onEdit() {
    this.educacion = this.modalForm.value;
    this.educacionService.editarEducacion(this.educacion).subscribe(() => {
      this.activeModal.close();
    });
  }

  onDelete() {
    this.educacionService.borrarEducacion(this.educacion.idEducacion).subscribe(() => {
      this.activeModal.close();
    });
  }

  get Titulo() {
    return this.modalForm.get('tituloEducacion');
  }

  get FechaInicio() {
    return this.modalForm.get('fechaInicioEducacion');
  }

  get FechaFin() {
    return this.modalForm.get('fechaFinEducacion');
  }

  get Descripcion() {
    return this.modalForm.get('descripcionEducacion');
  }

  get Imagen() {
    return this.modalForm.get('imagenEducacion');
  }
}
