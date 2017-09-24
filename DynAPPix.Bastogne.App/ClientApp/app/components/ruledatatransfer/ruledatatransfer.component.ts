import { Component, Input} from '@angular/core';
import { Control, Rule } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { DropdownSettings, Option, TextSettings, InputDataTypes } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";


@Component({
    selector: 'rule-data-transfer',
    templateUrl: './ruledatatransfer.component.html',
    styleUrls: ['./ruledatatransfer.component.css']
})
export class RuleDataTransferComponent {
    availableControls: Array<Control> = new Array<Control>();
    @Input() rule: Rule;
   
    //Settings Tab Properties
    ControlFrom: Control;
    ControlTo: Control;
    //Settings Tab Properties

    constructor(private eventsService: EventsService, private formManagerService: FormManagerService) {

    }

    ngOnInit() {
        this.formManagerService.subscribeToInputControls().subscribe((controls: Array<Control>) => {
            this.availableControls = controls;
        });
        this.getSettings();
        this.rule.triggerComponent = this;
        this.setRuleName();
    }

    //When the rule is triggered execute this.
    triggerFunction() {
        this.ControlTo.setValue(this.ControlFrom.getValue());
    }

    setRuleName() {
        //let name: string;
        //let from: string = this.ControlFrom._settings._ControlName || "Select Control";
        //let to: string = this.ControlTo._settings._ControlName || "Select Control";

        //name = "Transfer Data: Transfer the value of \"" + from + "\" to \"" + to + "\"";
        this.rule.ruleName = "TransferData";
    }

    getSettings() {
        if (this.rule.ruleSettings) {
            this.ControlFrom = this.availableControls.find(c => c.controlId == this.rule.ruleSettings.ControlFrom);
            this.ControlTo = this.availableControls.find(c => c.controlId == this.rule.ruleSettings.ControlTo);
        } else {
            this.rule.ruleSettings = {
                ControlFrom: "",
                ControlTo: ""
            };
        }
    }

    setSettings() {
        if (this.ControlFrom && this.ControlTo) {
            let rsettings = this.rule.ruleSettings;
            rsettings.ControlFrom = this.ControlFrom.controlId;
            rsettings.ControlTo = this.ControlTo.controlId;
            this.rule.ruleSettings = rsettings;
            this.setRuleName();
        }

    }
}
