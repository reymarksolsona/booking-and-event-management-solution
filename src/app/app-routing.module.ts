import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/feature/calendar/calendar.component';
import { EventsComponent } from './pages/feature/events/events.component';
import { MyProfileComponent } from './pages/feature/my-profile/my-profile.component';
import { VenuesComponent } from './pages/feature/venues/venues.component';
import { HomeComponent } from './pages/feature/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'events', component: EventsComponent },
    { path: 'venues', component: VenuesComponent },
    { path: 'my-profile', component: MyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }