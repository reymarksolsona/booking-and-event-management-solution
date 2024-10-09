import { Component, TemplateRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { HolidaysService } from 'src/app/core/holidays.service';
import { HttpParams } from '@angular/common/http';
import { HOLIDAY_API_ROUTE } from '../../../../shared/constants/holiday_api_route';
import { COUNTRY_CODE } from 'src/app/shared/constants/country_code';
import { HOLIDAY_API_KEY } from 'src/app/shared/constants/holiday_api_key';

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

  constructor(private modal: NgbModal, private holidayService: HolidaysService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getHolidays();
    }
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

    private getHolidays(): void {
        const params: HttpParams = new HttpParams()
            .set("country", COUNTRY_CODE)
            .set("year", String(new Date().getFullYear() - 1))
            .set("key", HOLIDAY_API_KEY);
            
        this.holidayService.getHolidays(HOLIDAY_API_ROUTE, params)
            .subscribe({
                next: (res: any) => {
                    const holidays = res.holidays.map((holiday: any) => ({
                        start: new Date(holiday.date),
                        title: holiday.name,
                        allDay: true,
                        meta: {
                          type: 'holiday',
                          holiday,
                        }
                    }));
                    this.events.push(...holidays);
                    this.cdr.markForCheck();
                }
            }
        );
    }
}
