import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TvStationsRoutingModule } from './tv-stations-routing.module';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    TvStationsRoutingModule
  ]
})
export class TvStationsModule { }
