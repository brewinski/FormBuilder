import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { TableSettings, TextSettings, InputDataTypes, TextboxConstructor, TableConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-dropdown',
    templateUrl: './controldropdown.component.html',
    styleUrls: ['./controldropdown.component.css']
})
export class ControlDropdownComponent extends InputControl {
    public "_Label Text": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General"
    );

    public "_Dropdown Options": TableConstructor = new TableConstructor("Dropdown Options",
        () => {
            this.mapPropertiesToJson(null);
        },
        null,
        { key: "Display Text", value: "Value" },
        "General"
    );

    constructor(eventsService: EventsService, formManagerService: FormManagerService) {
        super(eventsService, formManagerService);
    }

    ngOnInit() {
        this["_Label Text"].value = "Sample Text";
        this.mapPropertiesFromJson();
        this.setIdentifier();
    }

}
