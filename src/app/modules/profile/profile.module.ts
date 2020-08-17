import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {AppModule} from '../../app.module';
import {RemoveUnderscorePipe} from '../../utils/removeUnderscore/remove-underscore.pipe';


@NgModule({
  declarations: [ProfileComponent, RemoveUnderscorePipe],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatExpansionModule,
    ],
  exports: [RemoveUnderscorePipe]
})
export class ProfileModule { }
