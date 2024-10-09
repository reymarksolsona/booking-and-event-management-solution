import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Injectable,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { startOfYear, subYears } from 'date-fns';
import { Holiday } from '../shared/interface/holiday';
import { HolidayRequest } from '../shared/interface/holiday-request';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {

    constructor(private http: HttpClient, private rootUrl: EnvironmentService) {}

    public getHolidays = (route: string, request: HttpParams): Observable<Holiday[]> => {
        return this.http.get<Holiday[]>(
            this.createCompleteRoute(route, this.rootUrl.holidayApiAddress), 
            { params: request }
        );
    }

    private createCompleteRoute = (route: string, envAddress: string): string => {
        return `${envAddress}/${route}`;
    }
}
