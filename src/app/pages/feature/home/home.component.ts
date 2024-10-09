import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as atlas from 'azure-maps-control'
import * as msal from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  map: atlas.Map | undefined
  //@ViewChild('mapElement', { static: false }) mapViewChild!: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;
  private msalConfig = {
    auth: {
      clientId: '4d4ece44-3e46-4ec9-88f2-4d4af8c0989a',
      authority: 'https://login.microsoftonline.com/{your-tenant-id}',
      redirectUri: 'http://localhost:4200', 
    },
  };

  private msalInstance = new msal.PublicClientApplication(this.msalConfig);
  constructor(private modalService: NgbModal) {}
  ngAfterViewInit() {
    // Access the native element and modify its style
    console.log(this.content)
    this.content.nativeElement.style.backgroundColor = 'lightblue';
  }
  // ngAfterViewInit() {
  //   this.map = new atlas.Map(this.mapViewChild.nativeElement, {
  //     authOptions: {
  //       authType: atlas.AuthenticationType.subscriptionKey,
  //       subscriptionKey: 'Hk9mGeCHSYkZzNMwWkizYHrbu3DZyw7r7yWafAt3030SuUHJXySJQQJ99AJAC5RqLJwadhfAAAgAZMPoJep',
  //     },
  //   });
  // }

  // private loginAndInitializeMap() {
  //   const request = {
  //     scopes: ['https://atlas.azure.net/.default'],
  //   };

  //   // Login and acquire token
  //   this.msalInstance
  //     .loginPopup(request)
  //     .then((loginResponse) => {
  //       return this.msalInstance.acquireTokenSilent(request);
  //     })
  //     .then((tokenResponse) => {
  //       this.initializeMap(tokenResponse.accessToken);
  //     })
  //     .catch((error) => {
  //       console.error('Error during authentication', error);
  //     });
  // }

  // private initializeMap(token: string) {
  //   this.map = new atlas.Map(this.mapViewChild.nativeElement, {
  //     authOptions: {
  //       authType: atlas.AuthenticationType.aad,
  //       token: token,
  //     },
  //     center: [-122.33, 47.6], // Set the initial map center [longitude, latitude]
  //     zoom: 10, // Set the initial zoom level
  //   });
  // }
}
