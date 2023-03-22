import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadComponent,
    ProyectoComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      maxPercent: 100,
      startFromZero: false,
      outerStrokeWidth: 6,
      outerStrokeColor: "#ffffff",
      lazy: true,
      showInnerStroke: false,
      showImage: true,
      imageHeight: 70,
      imageWidth:70,
      renderOnClick: false,
      animationDuration: 700
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
