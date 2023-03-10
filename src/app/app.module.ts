import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
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
