import { Component, Input} from '@angular/core';
import { Control, Rule } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { DropdownSettings, Option, TextSettings, InputDataTypes } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";

class ControlVisibilityMap {
    public Control: Control;
    public ControlId: string;
    public Visibility: boolean;
    public ChangeVisibility: boolean;

    constructor(Control: Control, Visibility: boolean) {
        this.Control = Control;
        this.ControlId = this.Control.controlId; 
        this.Visibility = Visibility;
    }

    constructExisting(Control: Control, Visibility: boolean, ChangeVivibility: boolean) {
        
    }
}

@Component({
    selector: 'rule-set-visibility',
    templateUrl: './rulesetvisibility.component.html',
    styleUrls: ['./rulesetvisibility.component.css']
})
export class RuleSetVisibilityComponent {
    @Input() rule: Rule;

    private availableControls: Array<Control> = new Array<Control>();
    //Settings Tab Properties
    private ControlMap: Array<ControlVisibilityMap> = new Array<ControlVisibilityMap>();
    //Settings Tab Properties

    constructor(private eventsService: EventsService, private formManagerService: FormManagerService) {

    }

    ngOnInit() {
        this.formManagerService.subscribeToInputControls().subscribe((controls: Array<Control>) => {
            this.availableControls = controls;
            if (this.availableControls.length > 0) {
                for (let control of this.availableControls) {
                    this.ControlMap.push(new ControlVisibilityMap(control, false));
                }

                this.getSettings();
            }
        });

        this.rule.triggerComponent = this;

    }

    //When the rule is triggered execute this.
    triggerFunction() {
        for (let cm of this.ControlMap) {
            if (cm.ChangeVisibility) {
                cm.Control._visibility = cm.Visibility;
            }
        }
    }

    setRuleName() {
        let name: string = "SetVisibility";
        this.rule.ruleName = name;
    }

    getSettings() {
        if (this.rule.ruleSettings.ControlMap) {
            this.ControlMap = this.rule.ruleSettings.ControlMap;
            for (let map of this.ControlMap) {
                let typedMap = <ControlVisibilityMap>map;
                let addControl = this.availableControls.find(c => c.controlId == typedMap.ControlId);
                if (addControl) {
                    typedMap.Control = addControl;
                }
            }

        }
        else {
            this.rule.ruleSettings.ControlMap = new Array<ControlVisibilityMap>();
        }
    }

    setSettings() {
        let rsettings = this.rule.ruleSettings;
        rsettings.ControlMap = this.ControlMap;
        this.rule.ruleSettings = rsettings;
    }
}
