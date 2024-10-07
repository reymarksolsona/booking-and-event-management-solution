import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Subject } from 'rxjs';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  
  newEvent: any = {
    title: '',
    start: '',
    end: '',
    description: '',
    recurring: false,
    category: ''
  };

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
  events: CalendarEvent[] = [];
  
  isBookableSpaceCollapsed: boolean = false;
  isEventsCollapsed: boolean = false;
  
  constructor(private modalService: NgbModal) {}
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
  
    this.refresh.next(); // Refresh the calendar view
  }
  
  toggleBookableSpace() {
    this.isBookableSpaceCollapsed = !this.isBookableSpaceCollapsed;
  }
  
  toggleEvents() {
    this.isEventsCollapsed = !this.isEventsCollapsed;
  }

  openModal(category: string) {
    this.newEvent.category = category;
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  saveEvent() {
    // Convert the start and end to Date objects
    const startDate = new Date(this.newEvent.start);
    const endDate = new Date(this.newEvent.end);
  
    // Check for invalid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date provided');
      return;
    }
  
    const event: CalendarEvent = {
      title: this.newEvent.title,
      start: startDate, // Ensure this is a Date object
      end: endDate,     // Ensure this is a Date object
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      actions: this.actions,
      allDay: false,
      meta: {
        description: this.newEvent.description,
        recurring: this.newEvent.recurring
      }
    };
  
    if (this.newEvent.category === 'Bookable Space') {
      this.myCalendarEvents.push(event);
      this.saveToLocalStorage('BookableSpaceEvents', this.myCalendarEvents);
    } else if (this.newEvent.category === 'Events') {
      this.eventsCalendarEvents.push(event);
      this.saveToLocalStorage('EventsCalendarEvents', this.eventsCalendarEvents);
    }
  
    this.refresh.next(); // Refresh the calendar view
    this.modalService.dismissAll();
  
    // Clear the newEvent object for the next input
    this.newEvent = {
      title: '',
      start: '',
      end: '',
      description: '',
      recurring: false,
      category: ''
    };
  }
  

  saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.myCalendarEvents = this.myCalendarEvents.filter(event => event !== eventToDelete);
    this.eventsCalendarEvents = this.eventsCalendarEvents.filter(event => event !== eventToDelete);
    this.saveToLocalStorage('BookableSpaceEvents', this.myCalendarEvents);
    this.saveToLocalStorage('EventsCalendarEvents', this.eventsCalendarEvents);
  }
}
