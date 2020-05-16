import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { TvStationsRoutingModule } from './tv-stations-routing.module';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoListComponent } from './video-list/video-list.component';



@NgModule({
  declarations: [LandingPageComponent, VideoListComponent],
  imports: [
    CommonModule,
    VgCoreModule,
    TvStationsRoutingModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatProgressSpinnerModule,

  ],
  bootstrap: []
})
export class TvStationsModule { }
