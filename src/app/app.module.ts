import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app/pages/root/app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/shared/layout/header/header.component';
import { SidebarComponent } from './pages/shared/layout/sidebar/sidebar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './pages/feature/calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModalModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
