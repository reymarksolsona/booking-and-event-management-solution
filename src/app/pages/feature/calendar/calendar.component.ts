import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  modalData!: { action: string; event: CalendarEvent };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  refresh = new Subject<void>();
  myCalendarEvents: CalendarEvent[] = [
    { start: startOfDay(new Date()), title: 'My Calendar Event', color: colors['red'], actions: this.actions },
  ];
  usHolidaysEvents: CalendarEvent[] = [
    { start: startOfDay(new Date()), title: 'Independence Day', color: colors['blue'], actions: this.actions },
  ];
  birthdaysEvents: CalendarEvent[] = [
    { start: startOfDay(new Date()), title: 'Friend’s Birthday', color: colors['yellow'], actions: this.actions },
  ];

  // Holds selected calendars
  selectedCalendars: { calendarName: string; displayString: string; events: CalendarEvent[] }[] = [];
  isMyCalendarCollapsed: boolean = false;
  activeCalendar: string = 'myCalendar';

  constructor(private modal: NgbModal) {
    this.selectedCalendars.push({ calendarName: 'myCalendar',displayString: 'My Calendar', events: this.myCalendarEvents });
  }

  toggleMyCalendar() {
    this.isMyCalendarCollapsed = !this.isMyCalendarCollapsed;
  }

  toggleCalendar(calendarType: string): void {
    const index = this.selectedCalendars.findIndex(c => c.calendarName === calendarType);
    let calendarName: string = '';
    if (index > -1) {
      // Remove the calendar if already selected
      this.selectedCalendars.splice(index, 1);
    } else {
      // Add the selected calendar to the view
      let events: CalendarEvent[];
      switch (calendarType) {
        case 'myCalendar':
          events = this.myCalendarEvents;
          calendarName = 'My Calendar';
          break;
        case 'usHolidays':
          events = this.usHolidaysEvents;
            calendarName = 'US Holidays';
          break;
        case 'birthdays':
          events = this.birthdaysEvents;
            calendarName = 'Birthdays';
          break;
        default:
          return; // Early return if not a valid calendarType
      }
      this.selectedCalendars.push({ calendarName: calendarType, displayString: calendarName, events });
    }
    this.activeCalendar = calendarType;
    this.refresh.next(); // Refresh the calendar views
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = (events.length !== 0 && !isSameDay(this.viewDate, date)) ? true : false;
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent, events: CalendarEvent[]): void {
    const updatedEvents = events.map(iEvent => (iEvent === event ? { ...event, start: newStart, end: newEnd } : iEvent));
    this.selectedCalendars.forEach(calendar => {
      if (calendar.events.includes(event)) {
        calendar.events = updatedEvents;
      }
    });
    this.handleEvent('Dropped or resized', event);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.selectedCalendars.forEach(calendar => {
      calendar.events = calendar.events.filter(event => event !== eventToDelete);
    });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
  isCalendarActive(calendarName: string): boolean {
    return this.selectedCalendars.some(c => c.calendarName === calendarName);
  }
  
}
