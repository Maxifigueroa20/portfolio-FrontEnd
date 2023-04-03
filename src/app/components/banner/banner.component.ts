import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  bannerUrl: String = "";

  constructor(
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
      this.obtenerBanner();
  }

  obtenerBanner() {
    this.personaService.buscarPersona(1).subscribe(persona => {
      this.bannerUrl = persona.bannerPersona;
    })
  }
}
