import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { TableSettings, TextSettings, InputDataTypes, TextboxConstructor, TableConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-multiselect',
    templateUrl: './controlmultiselect.component.html',
    styleUrls: ['./controlmultiselect.component.css']
})
export class ControlMultiselectComponent extends InputControl {
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
        this.mapPropertiesFromJson();
        this.setIdentifier();
    }

}
