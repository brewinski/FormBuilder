import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { InputControl } from "../../app.model.inputcontrol";
import { InputDataTypes, TextSettings, DropdownSettings, Option, DropdownConstructor, TextboxConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'control-textbox',
    templateUrl: './controltextbox.component.html',
    styleUrls: ['./controltextbox.component.css']
})
export class ControlTextboxComponent extends InputControl {
    @Input() object: Control;

    public "_Label Text": TextboxConstructor = new TextboxConstructor("Text",
        () => {
            this.mapPropertiesToJson(null);
        },
        InputDataTypes.Text,
        "General"
    );

    public "_Textbox Type": DropdownConstructor = new DropdownConstructor("Data Type",
        [
            new Option("Text", InputDataTypes.Text),
            new Option("Password", InputDataTypes.Password),
            new Option("Number", InputDataTypes.Number),
            new Option("Date Time", InputDataTypes.DateTime),
            new Option("Date", InputDataTypes.Date),
            new Option("Month", InputDataTypes.Month),
            new Option("Week", InputDataTypes.Week),
            new Option("Color", InputDataTypes.Color),
            new Option("File", InputDataTypes.File),
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
        this["_Label Text"].value = "Sample Text";
        this["_Textbox Type"].value = InputDataTypes.Text;
        this.mapPropertiesFromJson();
        this.setIdentifier();
    }

}
