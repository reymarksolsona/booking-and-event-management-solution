import { CalendarEvent } from "angular-calendar";

export interface TRCEvent extends CalendarEvent {
    imgUrl: string
}

export interface TRCBookableSpace extends TRCEvent {
    contact: string,
    location: string,
    openHours: string[]
}