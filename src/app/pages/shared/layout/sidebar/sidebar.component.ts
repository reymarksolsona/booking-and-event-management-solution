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

/** Constructor **/
constructor() { }

/** Public Functions **/
public ngOnInit(): void { }

public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
    });
}

public toggleNav(): void {
    this.navbarClosed = !this.navbarClosed;
}

public toggleNavItem(item: string): void {
    if (this.navbarClosed) {
        this.toggleNav();
    }
}
}
