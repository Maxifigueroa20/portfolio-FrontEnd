import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ALPHANUMERIC_PATTERN, EMAIL_PATTERN, LETTER_PATTERN, NUMBER_PATTERN, URL_PATTERN } from 'src/app/helpers/utils';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-modal-acerca-de',
  templateUrl: './modal-acerca-de.component.html',
  styleUrls: ['./modal-acerca-de.component.css']
})
export class ModalAcercaDeComponent implements OnInit {
  @Input() persona: Persona = {
    idPersona: 0,
    nombrePersona: "",
    tituloPersona: "",
    descripcionPersona: "",
    numeroPersona: 0,
    correoPersona: "",
    imagenPersona: "",
    bannerPersona: ""
  }

  modalForm: FormGroup;

  constructor(
    private personaService: PersonaService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      idPersona: [this.persona.idPersona],
      nombrePersona: [this.persona.nombrePersona, [Validators.required, Validators.pattern(LETTER_PATTERN)]],
      tituloPersona: [this.persona.tituloPersona, [Validators.required, Validators.pattern(LETTER_PATTERN)]],
      descripcionPersona: [this.persona.descripcionPersona, [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)]],
      numeroPersona: [this.persona.numeroPersona, [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      correoPersona: [this.persona.correoPersona, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      imagenPersona: [this.persona.imagenPersona, [Validators.required, Validators.pattern(URL_PATTERN)]],
      bannerPersona: [this.persona.bannerPersona, [Validators.required, Validators.pattern(URL_PATTERN)]]
    })
  }

  ngOnInit(): void {
    this.modalForm.patchValue(this.persona);
  }

  cerrarModal() {
    this.activeModal.close();
  }

  onEdit() {
    this.persona = this.modalForm.value;
    this.personaService.editarPersona(this.persona).subscribe(() => {
      this.activeModal.close();
    });
  }

  get Nombre() {
    return this.modalForm.get('nombrePersona');
  }

  get Titulo() {
    return this.modalForm.get('tituloPersona');
  }

  get Descripcion() {
    return this.modalForm.get('descripcionPersona');
  }

  get Numero() {
    return this.modalForm.get('numeroPersona');
  }

  get Correo() {
    return this.modalForm.get('correoPersona');
  }

  get Imagen() {
    return this.modalForm.get('imagenPersona');
  }

  get Banner() {
    return this.modalForm.get('bannerPersona');
  }
}
