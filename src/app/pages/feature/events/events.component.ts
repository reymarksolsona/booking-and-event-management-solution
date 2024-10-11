import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { TRCEvent } from '../../shared/model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Map, AuthenticationType } from 'azure-maps-control';
import * as atlas from 'azure-maps-control';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: TRCEvent[] = [];selectedEvent: TRCEvent | null = null;
  @ViewChild('mapView', { static: true }) mapView!: TemplateRef<any>;
  @ViewChild('bookEvent', { static: true }) modalContent!: TemplateRef<any>;
  
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
        this.handleEvent('Deleted',event);
      },
    },
  ];


  eventsCalendarEvents: TRCEvent[] = [
    {
      title: 'Grand Central: Spring Fashion Weekend - Capsule Wardrobe Workshop',
      start: startOfDay(new Date('2024-10-20')),
      end: startOfDay(new Date('2024-10-21')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Get ready to embrace the joy of longer days and vibrant styles! Our Spring Fashion Weekend is here!',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F863351069%2F906220858863%2F1%2Foriginal.20241001-063256?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C110%2C1920%2C960&s=25c39ab8c622940bb54d0873c1799825'
    },
    {
      title: 'Aperitivo at The Pictures with Uniworld | Toowoomba',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Immerse yourself in the world of travelling with Uniworld as we showcase our breathtaking itineraries on the big screen.',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F822064069%2F251614097294%2F1%2Foriginal.20240807-043837?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=976559a6d804391afeb0fe3e1d198b0d'
    },
    {
      title: 'Toowoomba Workplace Breakfast Seminar',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Critical Workplace Cases and Regulatory Changes',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F728134009%2F147595477437%2F1%2Foriginal.20240326-012254?w=600&auto=format%2Ccompress&q=75&sharp=10&s=97013301bbcd6c1997d355339d83eba6'
    },
    {
      title: "FREE in Toowoomba: Embracing your child's potential",
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: "Join AEIOU Toowoomba for a FREE 2-hour workshop to gain insight and useful strategies whilst exploring a child's development.",
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F863335979%2F158651014239%2F1%2Foriginal.20241001-055313?crop=focalpoint&fit=crop&w=600&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.0132575757576&fp-y=0.466071428571&s=b4000a41c499670657f0acaf8c9943a9'
    },
    {
      title: 'TGW and Smithy Bring the Big Fights 37',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: "TGW & Smithy's Promotions presents THE BIG FIGHTS 37 featuring local favourites Stoneleigh Jackson, Dylan Biggs, 'Gunson' Morris & more.",
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F837424809%2F313053638472%2F1%2Foriginal.20240829-195350?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=1685%2C80%2C3826%2C1913&s=9134a3695b716551665ddef34eb0f1c6'
    },
    {
      title: 'Toowoomba Master Builders BUSSQ Golf Day',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'A friendly mix of competition and networking, while enjoying a fun day on the green with members and industry players.',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F836757709%2F261958759565%2F1%2Foriginal.20240829-035544?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2880%2C1440&s=44be5178efca5016015ceef2e06eb94f'
    },
    {
      title: 'Just Add Water: Nature subjects in Watercolour with Jan Lawnikanis (2 days)',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Join artist Jan Lawnikanis in exploring the mediums of watercolours and watersoluble pencils in creating vibrant and textural paintings.',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F641173449%2F317567202795%2F1%2Foriginal.20231114-030340?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=d2a76c4043335ee01fd146c98286f95f'
    },
    {
      title: 'Waterfalls & Creeks in Oil with Catherine Ketton (Friday Morning, 4 Weeks)',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'Learn how to approach the complex subject of Waterfalls & Creeks in this 4 week course with an experienced local artist & tutor(for adults).',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F835759889%2F317567202795%2F1%2Foriginal.20240828-040722?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=4b3d0162ed87f038c6d53f50ffdebde7'
    },
    {
      title: 'MAGIC MEN TAKE OVER TOOWOOMBA, QLD',
      start: startOfDay(new Date('2024-10-22')),
      end: startOfDay(new Date('2024-10-23')),
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      actions: this.actions,
      allDay: true,
      meta: {
        description: 'MAGIC MEN AUSTRALIA TAKE OVER TOOWOOMBA, QLD!!!',
        recurring: true
      },
      imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F622058169%2F266000297673%2F1%2Foriginal.20231017-064334?w=600&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2896%2C1448&s=ce3eaf8c1d987424d172831b67b3774c'
    }
  ];
  constructor(private modalService: NgbModal) {}
  ngOnInit() {
    this.events = [...this.eventsCalendarEvents];
    this.initializeMap();
  }
  activeTab: string = 'tiles';

  switchTab(tabName: string): void {
    this.activeTab = tabName
  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
  }
  
  openModal(trcEvent: TRCEvent) {
    this.selectedEvent = trcEvent;
    this.modalService.open(this.modalContent, { size: 'lg' });
  }
  
  openMap(trcEvent: TRCEvent) {
    this.selectedEvent = trcEvent;
    this.modalService.open(this.mapView, { size: 'lg' });
    setTimeout(() => this.initializeMap('modal-map'), 2000);
  }

  initializeMap(mapId: string = 'main-map', selectedEvent: any = null): void {
    let center = [];
    if (mapId === 'main-map') {
      center = [151.949997, -27.566668];
    } else {
      center = [151.949997, -27.566668];
      //center = [selectedEvent.coordinates[1], selectedEvent.coordinates[0]];
    }
    const map = new Map(mapId, {
      center: center,
      zoom: 8,
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'Hk9mGeCHSYkZzNMwWkizYHrbu3DZywS7r7yWafAt303oSuUHjXySJQQJ99AJAC5RqLJwadhfAAAgAZMPoJep'
      }
    });
    // if (mapId === 'main-map') {
    //   this.eventsCalendarEvents.forEach(event => {
    //     const coordinates = event.coordinates; // Assumed you have a `coordinates` property with [lat, lon]
    
    //     if (coordinates && coordinates.length === 2) {
    //       const lngLat = [coordinates[1], coordinates[0]]; // Reverse to [lon, lat]
      
    //       // Create a marker for the event
    //       const marker = new atlas.HtmlMarker({
    //         position: lngLat, 
    //         color: '#dc3545'
    //       });
    //       const popup = new atlas.Popup({
    //         content: `<div class="text-center" style="width: 220px; height: auto; padding: 15px; color: #ffffff; background-color: #378251; border-radius: 5px;">
    //           <div class="container-fluid text-center">
    //             <img src="${event.imgUrl}" width="150" class="mb-3" style="object-fit: cover; border-radius: 5px;">
    //           </div>
    //           <strong>${event.title}</strong><br>Contact No.: ${event.contact}
    //           <br>
    //   <button style="background-color: #378251;border: 1px solid;" class="btn btn-sm btn-primary mt-2" type="button" (click)="openModal(event)">Book</button>
    //         </div>`, // Customize popup content
    //         position: [lngLat[0], lngLat[1] + 0.050]
    //       });
    //       // Add the marker to the map
    //       map.markers.add(marker);
    //       marker.getElement().addEventListener('click', () => {
    //         // Open or close the popup on click
    //         if (popup.isOpen()) {  // Call isOpen() method
    //           popup.close();
    //         } else {
    //           popup.open(map);
    //         }
    //       });
    //     }
    //   });
    // } else {
    //   const coordinates = selectedEvent?.coordinates; // Assumed you have a `coordinates` property with [lat, lon]
    // console
    //     if (coordinates && coordinates.length === 2) {
    //       const lngLat = [coordinates[1], coordinates[0]]; // Reverse to [lon, lat]
      
    //       // Create a marker for the event
    //       const marker = new atlas.HtmlMarker({
    //         position: lngLat, // Use the correctly ordered lngLat
    //         color: '#dc3545'
    //       });
    //       const popup = new atlas.Popup({
    //         content: `<div class="text-center" style="width: 220px; height: auto; padding: 15px; color: #ffffff; background-color: #378251; border-radius: 5px;">
    //           <div class="container-fluid text-center">
    //             <img src="${selectedEvent?.imgUrl}" width="150" class="mb-3" style="object-fit: cover; border-radius: 5px;">
    //           </div>
    //           <strong>${selectedEvent?.title}</strong><br>Contact No.: ${selectedEvent?.contact}
    //         </div>`, // Customize popup content
    //         position: [lngLat[0], lngLat[1] + 0.050]
    //       });
    //       // Add the marker to the map
    //       map.markers.add(marker);
    //       marker.getElement().addEventListener('click', () => {
    //         // Open or close the popup on click
    //         if (popup.isOpen()) {  // Call isOpen() method
    //           popup.close();
    //         } else {
    //           popup.open(map);
    //         }
    //       });
    //     }
    // }
  }
}
