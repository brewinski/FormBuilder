import { Component, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { Control } from '../../app.model';
import { InputControl } from "../../app.model.inputcontrol";
import { EventsService } from "../../services/events.service";
import { DropdownSettings, Option, TextSettings, InputDataTypes, DropdownConstructor, TextboxConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";


@Component({
    selector: 'control-heading',
    templateUrl: './controlheading.component.html',
    styleUrls: ['./controlheading.component.css']
})
export class ControlHeadingComponent extends InputControl {

    //Settings Tab Properties
    public "_Heading Text": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General",
        "Sample Heading"
    );

    public "_Heading Size": DropdownConstructor = new DropdownConstructor("Size",
        [
            new Option("Heading 1", "h1"),
            new Option("Heading 2", "h2"),
            new Option("Heading 3", "h3"),
            new Option("Heading 4", "h4"),
            new Option("Heading 5", "h5"),
            new Option("Heading 6", "h6")
        ],
        () => {
            this.mapPropertiesToJson(null);
        },
        "General"
    );
    //Settings Tab Properties

    constructor(eventsService: EventsService, formManagerService: FormManagerService) {
        super(eventsService, formManagerService);
    }

    ngOnInit() {
        this.mapPropertiesFromJson();
        this.setIdentifier();
    }
}
