import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
/** Public Variables **/
public title: string = "uics";
public navbarClosed: Boolean = false;

/** Private Variables **/
private subscriptions = new Array<Subscription>();
private defaultNavItems = [
    { value: "Dashboard", isActive: false },
    { value: "Action Items", isActive: false },
    { value: "Main Facilities", isActive: false },
    { value: "Reports", isActive: false },
    { value: "Configuration", isActive: false },
    { value: "References", isActive: false }
];
private mainFacilitiesSubItems = [
    { value: "Validation", isActive: false },
    { value: "Masterlist", isActive: false },
    { value: "Claims", isActive: false },
];

private mainFacilitiesSubItems2 = [
    { value: "Validation Report", isActive: false },
];

/** Constructor **/
constructor() {
    // this.sidebarService.navbarClosed.subscribe((value) => {
    //     this.navbarClosed = value;
    //     this.changeNavState(-1);
    // });
}

/** Public Functions **/
public ngOnInit(): void { }

public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });
}

public toggleNav(): void {
    //this.sidebarService.toggleSideBar(!this.navbarClosed);
}

public toggleNavItem(item: string): void {
    if (this.navbarClosed) {
        this.toggleNav();
    }

    switch (item) {
        case "Dashboard": {
            this.changeNavState(0);
            break;
        }
      case "Action Items": {
          this.changeNavState(1);
          break;
      }
      case "Main Facilities": {
          this.changeNavState(2);
          break;
      }
      case "Reports": {
          this.changeNavState(3);
          break;
      }
      case "Configuration": {
          this.changeNavState(4);
          break;
      }
      case "References": {
          this.changeNavState(5);
          break;
      }
      default: {
          this.changeNavState(-1);
          break;
      }
    }
}

public toggleNavSubItem(item: string): void {
    if (this.navbarClosed) {
        this.toggleNav();
    }

    switch (item) {
        case "Validation" : {
            this.changeNavSubItemState(0);
            break;
        }
        case "Masterlist" : {
            this.changeNavSubItemState(1);
            break;
        }
        case "Claims": {
            this.changeNavSubItemState(2);
            break;
        }
        case "Loans" : {
            this.changeNavSubItemState(3);
            break;
        }
    }
}

public toggleNavSubItem2(item: string): void {
    if (this.navbarClosed) {
        this.toggleNav();
    }

    switch (item) {
        case "Validation Report" : {
            this.changeNavSubItemState2(0);
            break;
        }
       
    }
}

public checkIfMainFacilitiesSubitemsIsActive(item: string): boolean {
    let result: boolean = false;
    this.mainFacilitiesSubItems.find((navItem) => {
        if (item === navItem.value) {
            result = navItem.isActive;
        }
    });
    return result;
}

public checkIfMainFacilitiesSubitems2IsActive(item: string): boolean {
    let result: boolean = false;
    this.mainFacilitiesSubItems2.find((navItem) => {
        if (item === navItem.value) {
            result = navItem.isActive;
        }
    });
    return result;
}

public checkIfNavIsActive(item: string): boolean {
    let result: boolean = false;
    this.defaultNavItems.forEach((navItem) => {
        if (item === navItem.value) {
            result = navItem.isActive;
        }
    });
    return result;
}

/** Private Functions **/
private changeNavState(index: number) {
    this.defaultNavItems = this.defaultNavItems.map((item, itemIndex) => {
        index === itemIndex
          ? (item.isActive = !item.isActive)
          : (item.isActive = false);
        return item;
    });
}

private changeNavSubItemState(index: number) {
    this.mainFacilitiesSubItems = this.mainFacilitiesSubItems.map((item, itemIndex) => {
        index === itemIndex
          ? (item.isActive = !item.isActive)
          : (item.isActive = false);
        return item;
    });
}

private changeNavSubItemState2(index: number) {
    this.mainFacilitiesSubItems2 = this.mainFacilitiesSubItems2.map((item, itemIndex) => {
        index === itemIndex
          ? (item.isActive = !item.isActive)
          : (item.isActive = false);
        return item;
    });
}
}
