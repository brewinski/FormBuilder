import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { InputDataTypes, TextSettings, DropdownSettings, Option, TextboxConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-textarea',
    templateUrl: './controltextarea.component.html',
    styleUrls: ['./controltextarea.component.css']
})
export class ControlTextareaComponent extends InputControl {
    @Input() object: Control;

    public "_Label Text": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General"
    );

    public "_Rows": TextboxConstructor = new TextboxConstructor("Number of Rows",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Number,
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
