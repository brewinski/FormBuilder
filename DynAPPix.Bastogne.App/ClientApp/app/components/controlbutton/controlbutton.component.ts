import { Component, Input } from '@angular/core';
import { Control, Event } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { InputDataTypes, TextSettings, DropdownSettings, Option, TextboxConstructor, DropdownConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-button',
    templateUrl: './controlbutton.component.html',
    styleUrls: ['./controlbutton.component.css']
})
export class ControlButtonComponent extends InputControl {

    @Input() object: Control;

    public "_ButtonText": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General"
    );

    public _ButtonStyle: DropdownConstructor = new DropdownConstructor("Style",
        [
            new Option("Button Default", "btn-default"),
            new Option("Button Primary", "btn-primary"),
            new Option("Button Success", "btn-success"),
            new Option("Button Info", "btn-info"),
            new Option("Button Warning", "btn-warning"),
            new Option("Button Danger", "btn-danger"),
            new Option("Button Link", "btn-link"),
        ],
        () => {
            this.mapPropertiesToJson(null);
        },
        "General"
    );

    constructor(eventsService: EventsService, formManagerService: FormManagerService) {
        super(eventsService, formManagerService);
    }

    ngOnInit() {
        this._ButtonText.value = "Submit";
        this._ButtonStyle.value = "btn -default";
        this.mapPropertiesFromJson();
        this.setIdentifier();
        this.registerEvents(new Array<Event>(
            new Event("On Click", this.object.controlId)
        ));
    }

    //Call this function to trigger the On Click event
    onClick() {
        this.eventsService.triggerSystemRule("On Click", this.object);
    }

}
