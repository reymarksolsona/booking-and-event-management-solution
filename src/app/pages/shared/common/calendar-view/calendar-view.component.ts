import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  @Input() view: CalendarView = CalendarView.Month;
  @Input() viewDate: Date = new Date();
  @Input() events: CalendarEvent[] = [];
  @Input() actions: CalendarEventAction[] = [];

  CalendarView = CalendarView;
  refresh = new Subject<void>();
  modalData!: { action: string; event: CalendarEvent; };

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
          if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
              this.activeDayIsOpen = false;
          } else {
              this.activeDayIsOpen = true;
          }
          this.viewDate = date;
      }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
              return { ...event, start: newStart, end: newEnd };
          }
          return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView): void {
      this.view = view;
  }

  closeOpenMonthViewDay(): void {
      this.activeDayIsOpen = false;
  }
}
