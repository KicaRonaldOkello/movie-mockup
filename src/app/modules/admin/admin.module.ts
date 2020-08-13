import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from "@angular/material/icon";
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QuillModule } from 'ngx-quill';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ManageBlogComponent } from './manage-blog/manage-blog.component';
import { BlogModule } from '../blog/blog.module';
import { ManageVideosComponent } from './manage-videos/manage-videos.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { DisplayVideosComponent } from './display-videos/display-videos.component';
import { ManagePlaylistComponent } from './manage-playlist/manage-playlist.component';
import {TvStationsModule} from '../tv-stations/tv-stations.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import {TranslatorServicesModule} from '../translator-services/translator-services.module';
import { LiquidationRequestsComponent } from './liquidation-requests/liquidation-requests.component';
import {MatTableModule} from '@angular/material/table';




@NgModule({
  declarations: [
      AdminComponent,
      ManageBlogComponent,
      ManageVideosComponent,
      VideoCardComponent,
      DisplayVideosComponent,
      ManagePlaylistComponent,
      ManageUsersComponent,
      LiquidationRequestsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    DragDropModule,
    BlogModule,
    QuillModule.forRoot({
      // modules: {
      //   toolbar: [
      //     ['bold', 'italic', 'underline', 'strike'],
      //     ['blockquote', 'code-block'],
      //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      //     [{ 'script': 'sub'}, { 'script': 'super' }],
      //     [{ 'indent': '-1'}, { 'indent': '+1' }],
      //     [{ 'direction': 'rtl' }],
      //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //   ]
      // }
    }),
    TvStationsModule,
    TranslatorServicesModule,
    MatTableModule,
  ],
  exports: [
  ]
})
export class AdminModule { }
