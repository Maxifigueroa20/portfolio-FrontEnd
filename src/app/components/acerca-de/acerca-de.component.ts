import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from 'src/app/helpers/utils';
import { Persona } from 'src/app/model/persona';
import { AuthService } from 'src/app/service/auth.service';
import { PersonaService } from 'src/app/service/persona.service';
import { ModalAcercaDeComponent } from './modal-acerca-de/modal-acerca-de.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {
  persona!: Persona;

  constructor(
    private authService: AuthService,
    private personaService: PersonaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerPersona();
  }

  obtenerPersona() {
    this.personaService.buscarPersona(1).subscribe(persona => {
      this.persona = persona;
    })
  }

  onEdit() {
    const modalRef = this.modalService.open(ModalAcercaDeComponent, MODAL_OPTIONS)
    modalRef.componentInstance.persona = this.persona;
    modalRef.result.then(() => {
      this.obtenerPersona();
    });
  }

  get isAdmin(): Boolean {
    return this.authService.isAdmin();
  }
}
