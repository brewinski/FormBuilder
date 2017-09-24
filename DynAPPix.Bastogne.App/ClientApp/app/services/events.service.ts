import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Control, PartialForm, Event, FormEventTypes, Rule } from '../app.model';
import { RuleDataTransferComponent } from "../components/ruledatatransfer/ruledatatransfer.component";
import { FormManagerService } from "./formmanager.service";

@Injectable()
export class EventsService {
    private Form: PartialForm = new PartialForm();
    private isBuilder: boolean;

    private selectedControl: any;

    public EventsChange: BehaviorSubject<Array<Event>> = new BehaviorSubject<Array<Event>>(null);

    constructor(
        private formManagerService: FormManagerService
    ) { 
        this.formManagerService.susbscribeToForm().subscribe(
            (form: PartialForm) => {
                this.Form = form;
                if (form) {
                    this.EventsChange.next(this.Form.event);

                    if (!(this.Form.event.length > 0)) {
                        this.setEvents(new Array<Event>(
                            new Event(FormEventTypes.Starting),
                            new Event(FormEventTypes.Started),
                            new Event(FormEventTypes.Refresh)
                        ));
                    }
                    else {
                        this.setEvents(this.Form.event);
                    }
                }
            }, (error) => {
                alert(error);
            }
        );

        this.formManagerService.subscribeToSelectedControl().subscribe(
            (selectedControl) => {
                this.selectedControl = selectedControl;
            }, (error: any) => {
                alert(error);
            }
        );
    }

    getEvents(): Array<Event> {
        if (this.Form)
            return this.Form.event;
        else
            return new Array<Event>();
    }

    setEvents(Events?: Array<Event>) {
        if (Events) {
            this.Form.event = Events;
        }

        this.EventsChange.next(this.Form.event);
    }

    addEvent(Event: Event) {
        let existingEvent = this.Form.event.find(e => e.eventId == Event.eventId);

        if (existingEvent) {
            console.log("Event has been attached to the existing event.");
        } else {
            this.Form.event.push(Event);
            this.EventsChange.next(this.Form.event);
            console.log("Event has been registered");
        }
    }

    removeEvent(Event: Event) {
        this.Form.event.splice(this.Form.event.indexOf(Event), 1);
    }

    registerEvents(Events: Array<Event>) {
        for (let Event of Events) {
            let existingEvent = this.Form.event.find(e => e.controlId == Event.controlId);
            if (existingEvent) {
                console.log("Event has been attached to the existing event.");
            }
            else {
                this.Form.event.push(Event);
                this.EventsChange.next(this.Form.event);
                console.log("Event has been registered");
            }
        }
    }

    triggerSystemRule(EventType: string, Control: Control) {
        if (this.isBuilder) //TODO: Not this. (Bad practice. Dont retern a console log.)
            return console.log("control event triggerd in builder")

        this.Form.event.find(e => e.controlId == Control.controlId && e.eventName == EventType).triggerRules();
    }

    triggerFormRule(EventType: string, FormId) {
        if (this.isBuilder) //TODO: Not this. (Bad practice. Dont retern a console log.)
            return console.log("event triggered in builder");

        this.Form.event.forEach(function callback(currentEvent, index, array) {
            if (EventType == currentEvent.eventName) {
                currentEvent.triggerRules();
            }
        });
    }

    setContext(isBuilder: boolean) {
        this.isBuilder = isBuilder
    }

    getContext(): boolean {
        return this.isBuilder;
    }

    setFormRefrence(PartialForm: PartialForm) {
        this.setEvents(this.Form.event);
        //this.triggerFormRule("starting", null);
    }

}