import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ALPHANUMERIC_PATTERN, NUMBER_PATTERN, URL_PATTERN } from 'src/app/helpers/utils';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/service/habilidad.service';

@Component({
  selector: 'app-modal-habilidad',
  templateUrl: './modal-habilidad.component.html',
  styleUrls: ['./modal-habilidad.component.css']
})
export class ModalHabilidadComponent {
  @Input() habilidad: Habilidad = {
    idHabilidad: 0,
    tituloHabilidad: "",
    porcentajeHabilidad: 0,
    imagenHabilidad: "",
  }

  @Input() modalMode: string = "";

  modalForm: FormGroup;

  constructor(
    private habilidadService: HabilidadService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      idHabilidad: [this.habilidad.idHabilidad],
      tituloHabilidad: [this.habilidad.tituloHabilidad, [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)]],
      porcentajeHabilidad: [this.habilidad.porcentajeHabilidad, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      imagenHabilidad: [this.habilidad.imagenHabilidad, [Validators.required, Validators.pattern(URL_PATTERN)]],
    })
  }

  ngOnInit(): void {
    this.modalForm.patchValue(this.habilidad);
  }

  cerrarModal() {
    this.activeModal.close();
  }

  onCreate() {
    this.habilidad = this.modalForm.value;
    this.habilidadService.agregarHabilidad(this.habilidad).subscribe(() => {
      this.activeModal.close();
    });
  }

  onEdit() {
    this.habilidad = this.modalForm.value;
    this.habilidadService.editarHabilidad(this.habilidad).subscribe(() => {
      this.activeModal.close();
    });
  }

  onDelete() {
    this.habilidadService.borrarHabilidad(this.habilidad.idHabilidad).subscribe(() => {
      this.activeModal.close();
    });
  }

  get Titulo() {
    return this.modalForm.get('tituloHabilidad');
  }

  get Imagen() {
    return this.modalForm.get('imagenHabilidad');
  }
}
