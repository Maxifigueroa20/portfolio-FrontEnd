import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ALPHANUMERIC_PATTERN, NUMBER_PATTERN, TITLE_PATTERN, URL_PATTERN } from 'src/app/helpers/utils';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-modal-experiencia',
  templateUrl: './modal-experiencia.component.html',
  styleUrls: ['./modal-experiencia.component.css']
})
export class ModalExperienciaComponent {
  @Input() experiencia: Experiencia = {
    idExperiencia: 0,
    tituloExperiencia: "",
    fechaInicioExperiencia: 0,
    fechaFinExperiencia: 0,
    imagenExperiencia: "",
  }

  @Input() modalMode: string = "";

  modalForm: FormGroup;

  constructor(
    private experienciaService: ExperienciaService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      idExperiencia: [this.experiencia.idExperiencia],
      tituloExperiencia: [this.experiencia.tituloExperiencia, [Validators.required, Validators.pattern(TITLE_PATTERN)]],
      fechaInicioExperiencia: [this.experiencia.fechaInicioExperiencia, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      fechaFinExperiencia: [this.experiencia.fechaFinExperiencia, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      imagenExperiencia: [this.experiencia.imagenExperiencia, [Validators.required, Validators.pattern(URL_PATTERN)]]
    })
  }

  ngOnInit(): void {
    this.modalForm.patchValue(this.experiencia);
  }

  cerrarModal() {
    this.activeModal.close();
  }

  onCreate() {
    this.experiencia = this.modalForm.value;
    this.experienciaService.agregarExperiencia(this.experiencia).subscribe(() => {
      this.activeModal.close();
    });
  }

  onEdit() {
    this.experiencia = this.modalForm.value;
    this.experienciaService.editarExperiencia(this.experiencia).subscribe(() => {
      this.activeModal.close();
    });
  }

  onDelete() {
    this.experienciaService.borrarExperiencia(this.experiencia.idExperiencia).subscribe(() => {
      this.activeModal.close();
    });
  }

  get Titulo() {
    return this.modalForm.get('tituloExperiencia');
  }

  get FechaInicio() {
    return this.modalForm.get('fechaInicioExperiencia');
  }

  get FechaFin() {
    return this.modalForm.get('fechaFinExperiencia');
  }

  get Descripcion() {
    return this.modalForm.get('descripcionExperiencia');
  }

  get Imagen() {
    return this.modalForm.get('imagenExperiencia');
  }
}
