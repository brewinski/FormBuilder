import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { TableSettings, TextSettings, InputDataTypes, TextboxConstructor, TableConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-radiolist',
    templateUrl: './controlradiolist.component.html',
    styleUrls: ['./controlradiolist.component.css']
})
export class ControlRadiolistComponent extends InputControl {
    @Input() object: Control;

    public "_Label Text": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General"
    );

    public "_Select Options": TableConstructor = new TableConstructor("Select Options",
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
        this["_Select Options"].value = [
            { "Display Text": "Option 1", "Value": "1" },
            { "Display Text": "Option 2", "Value": "2" },
            { "Display Text": "Option 3", "Value": "3" }
        ];
        this.mapPropertiesFromJson();
        this.setIdentifier();
    }

}
