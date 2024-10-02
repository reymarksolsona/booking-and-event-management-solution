import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/feature/calendar/calendar.component';
import { EventsComponent } from './pages/feature/events/events.component';
import { MyProfileComponent } from './pages/feature/my-profile/my-profile.component';

const routes: Routes = [
    { path: '', redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: CalendarComponent },
    { path: 'events', component: EventsComponent },
    { path: 'my-profile', component: MyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }