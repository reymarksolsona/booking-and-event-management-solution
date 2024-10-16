import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { FlatpickrModule } from 'angularx-flatpickr';
import * as moment from 'moment';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app/pages/root/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './pages/feature/calendar/calendar.component';
import { EventsComponent } from './pages/feature/events/events.component';
import { HomeComponent } from './pages/feature/home/home.component';
import { VenuesComponent } from './pages/feature/venues/venues.component';
import { CalendarViewComponent } from './pages/shared/common/calendar-view/calendar-view.component';
import { HeaderComponent } from './pages/shared/layout/header/header.component';
import { SidebarComponent } from './pages/shared/layout/sidebar/sidebar.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CalendarComponent,
    CalendarViewComponent,
    EventsComponent,
    VenuesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModalModule,
    CommonModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    NgbModule
  ],
  providers:  [],
  bootstrap: [AppComponent]
})
export class AppModule { }
