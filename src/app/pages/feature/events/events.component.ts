import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];
  myCalendarEvents: CalendarEvent[] = [
    {
      title: 'Cecil Plains Library',
      start: startOfDay(new Date('2024-10-10')),
      end: startOfDay(new Date('2024-10-12')),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is my first event',
        recurring: false
      }
    },
    {
      title: 'Clifton - Elsie Jones park',
      start: startOfDay(new Date('2024-10-15')),
      end: startOfDay(new Date('2024-10-16')),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is my second event',
        recurring: false
      }
    },
    {
      title: 'Cooyar - Swinging Bridge park',
      start: startOfDay(new Date('2024-10-15')),
      end: startOfDay(new Date('2024-10-16')),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is my third event',
        recurring: false
      }
    },
    {
      title: 'Highfields Cultural Centre',
      start: startOfDay(new Date('2024-10-15')),
      end: startOfDay(new Date('2024-10-16')),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is my fourth event',
        recurring: false
      }
    },
    {
      title: 'Empire Theatre',
      start: startOfDay(new Date('2024-10-15')),
      end: startOfDay(new Date('2024-10-16')),
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is my fifth event',
        recurring: false
      }
    }
  ];

  eventsCalendarEvents: CalendarEvent[] = [
    {
      title: 'Bloom Towoomba - Feminine Self...',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is an event',
        recurring: true
      }
    },
    {
      title: 'Towoomba, Careers Week Lunch',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'This is another event',
        recurring: true
      }
    }
  ];
  
  ngOnInit() {
    this.loadEventsFromLocalStorage();
  }

  loadEventsFromLocalStorage() {
    const bookableSpaceEvents = localStorage.getItem('BookableSpaceEvents');
    if (bookableSpaceEvents) {
      this.myCalendarEvents = JSON.parse(bookableSpaceEvents).map((event:any) => ({
        ...event,
        start: new Date(event.start), // Convert to Date object
        end: new Date(event.end)      // Convert to Date object
      }));
      this.events = this.myCalendarEvents;
    }
  
    // Load Events Calendar Events
    const eventsCalendarEvents = localStorage.getItem('EventsCalendarEvents');
    if (eventsCalendarEvents) {
      this.eventsCalendarEvents = JSON.parse(eventsCalendarEvents).map((event: any) => ({
        ...event,
        start: new Date(event.start), // Convert to Date object
        end: new Date(event.end)      // Convert to Date object
      }));
    }
  
    // Combine both events into the events array
    this.events = [...this.myCalendarEvents, ...this.eventsCalendarEvents];

  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }
  editEvent(event: CalendarEvent) {
    // Implement the edit logic here
    console.log('Editing event:', event);
    // You might want to open a modal for editing the event
  }
  
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.saveToLocalStorage(); // Make sure to update local storage after deletion
  }
  
  saveToLocalStorage() {
    localStorage.setItem('EventsCalendarEvents', JSON.stringify(this.events));
  }
  
}
