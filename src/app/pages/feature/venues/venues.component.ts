import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { TRCBookableSpace, TRCEvent } from '../../shared/model/model';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  events: TRCBookableSpace[] = [];
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


  stashedeventsCalendarEvents: TRCBookableSpace[] = [
    {
      title: 'Cecil Plains Library',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/510-libraries/511-libraryLocationHours/cecil_plains.jpg',
      location: 'Taylor Street, Cecil Plains',
      contact: '4668 0250',
      openHours: [
        "Wednesday - 10am to 1pm & 2pm to 5pm",
        "Friday - 10am to 1pm & 2pm to 5pm"
      ]
    },
    {
      title: 'Clifton Library',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/510-libraries/511-libraryLocationHours/clifton.jpg',
      location: '8 Meara Place, Clifton',
      contact: '4697 4223',
      openHours: [
        "Tuesday - 9.30am to 1pm & 2pm to 5pm",
        "Wednesday - 9.30am to 1pm & 2pm to 5pm",
        "Thursday - 9.30am to 1pm & 2pm to 5pm"
      ]
    },
    {
      title: 'Highfields Cultural Centre',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/550-functionCentres/Highfields%20CulturalCentrearticlewide.jpg#joomlaImage://local-images/500-facilityRecreation/550-functionCentres/Highfields%20CulturalCentrearticlewide.jpg?width=870&height=423',
      location: "O'Brien Road, Highfields",
      contact: ' 07 4699 6500',
      openHours: [
        "Tuesday - 9.30am to 1pm & 2pm to 5pm",
        "Wednesday - 9.30am to 1pm & 2pm to 5pm",
        "Thursday - 9.30am to 1pm & 2pm to 5pm"
      ]
    }
  ];

  eventsCalendarEvents: TRCBookableSpace[] = [
    {
      title: 'Cecil Plains Library',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/510-libraries/511-libraryLocationHours/cecil_plains.jpg',
      location: 'Taylor Street, Cecil Plains',
      contact: '4668 0250',
      openHours: [
        "Wednesday - 10am to 1pm & 2pm to 5pm",
        "Friday - 10am to 1pm & 2pm to 5pm"
      ]
    },
    {
      title: 'Clifton Library',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/510-libraries/511-libraryLocationHours/clifton.jpg',
      location: '8 Meara Place, Clifton',
      contact: '4697 4223',
      openHours: [
        "Tuesday - 9.30am to 1pm & 2pm to 5pm",
        "Wednesday - 9.30am to 1pm & 2pm to 5pm",
        "Thursday - 9.30am to 1pm & 2pm to 5pm"
      ]
    },
    {
      title: 'Highfields Cultural Centre',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://www.tr.qld.gov.au/images/500-facilityRecreation/550-functionCentres/Highfields%20CulturalCentrearticlewide.jpg#joomlaImage://local-images/500-facilityRecreation/550-functionCentres/Highfields%20CulturalCentrearticlewide.jpg?width=870&height=423',
      location: "O'Brien Road, Highfields",
      contact: ' 07 4699 6500',
      openHours: [
        "Tuesday - 9.30am to 1pm & 2pm to 5pm",
        "Wednesday - 9.30am to 1pm & 2pm to 5pm",
        "Thursday - 9.30am to 1pm & 2pm to 5pm"
      ]
    }
  ];
  
  ngOnInit() {
    this.loadEventsFromLocalStorage();
  }

  loadEventsFromLocalStorage() {
    const lsEvents = localStorage.getItem('lsEvents');
    if (lsEvents) {
      this.eventsCalendarEvents = JSON.parse(lsEvents).map((event:any) => ({
        ...event,
        start: new Date(event.start), // Convert to Date object
        end: new Date(event.end)      // Convert to Date object
      }));
      this.events = this.eventsCalendarEvents;
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
    this.events = [...this.eventsCalendarEvents];

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
