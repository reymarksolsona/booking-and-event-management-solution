import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
    public holidayApiAddress: string = environment.holidayApi.baseUrl;
}
