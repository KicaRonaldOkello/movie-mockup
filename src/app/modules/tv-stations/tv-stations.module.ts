import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { TvStationsRoutingModule } from './tv-stations-routing.module';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VideoListComponent } from './video-list/video-list.component';
import {MatMenuModule} from '@angular/material';
import {MinuteSecondsPipe} from '../../utils/minute-seconds.pipe';
import {SharedModule} from '../shared/shared.module';
import {PaymentModalComponent} from '../shared/payment-modal/payment-modal.component';
import {YouTubePlayerModule} from '@angular/youtube-player';



@NgModule({
    declarations: [LandingPageComponent, VideoListComponent, MinuteSecondsPipe,],
    imports: [
        CommonModule,
        VgCoreModule,
        TvStationsRoutingModule,
        VgControlsModule,
        VgOverlayPlayModule,
        MatIconModule,
        VgBufferingModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        SharedModule,
        MatDialogModule,
        YouTubePlayerModule

    ],
    bootstrap: [PaymentModalComponent],
    exports: [
        MinuteSecondsPipe
    ],
    entryComponents: [PaymentModalComponent]
})
export class TvStationsModule { }
