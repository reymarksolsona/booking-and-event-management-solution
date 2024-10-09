import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { FlatpickrModule } from 'angularx-flatpickr';
import * as moment from 'moment';

import { AppComponent } from '../app/pages/root/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './pages/feature/calendar/calendar.component';
import { HeaderComponent } from './pages/shared/layout/header/header.component';
import { SidebarComponent } from './pages/shared/layout/sidebar/sidebar.component';
import { CalendarViewComponent } from './pages/shared/common/calendar-view/calendar-view.component';
import { EventsComponent } from './pages/feature/events/events.component';
import { VenuesComponent } from './pages/feature/venues/venues.component';
import { HomeComponent } from './pages/feature/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicClientApplication ,InteractionType} from '@azure/msal-browser';
import { MsalModule, MsalInterceptor, MSAL_INSTANCE, MsalService, MSAL_INTERCEPTOR_CONFIG ,MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

const msalConfig = {
  auth: {
    clientId: '4d4ece44-3e46-4ec9-88f2-4d4af8c0989a',
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your tenant ID
    redirectUri: 'https://localhost:4200', 
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// MSAL Guard Configuration
const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['User.Read'], // Add your required scopes here
  },
};

// MSAL Interceptor Configuration
const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect, 
  protectedResourceMap: new Map<string, string[]>([
    ['https://atlas.microsoft.com/', ['YOUR_AZURE_MAPS_SCOPE']], // Use Azure Maps scope
  ]),
};
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
    NgbModule,
    MsalModule.forRoot(msalInstance, msalGuardConfig, msalInterceptorConfig),
  ],
  providers:  [
    MsalService,
    MsalInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
