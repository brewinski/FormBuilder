import { BehaviorSubject, Observable } from "rxjs";

export class Control {
    constructor(controlTypeId: string) {
        this.controlTypeId = controlTypeId;
        this.control = new Array<Control>();
        this.onSettingsChange = new BehaviorSubject<any>(null);
    }
    public controlId: string;
    public createdDate: Date = null;
    public createdId: string = null;
    public updatedDate: Date = null;
    public updatedId: string = null;
    public name: string = "New Control";
    public controlTypeId: string;
    public partialId: string;
    public parentControlId: string;
    public order: number = 0;
    public parentControl: string;
    public control: Array<Control> = new Array<Control>();
    public isNew: boolean = true;

    private instanceType: string = null;
    get _instanceType(): string { return this.instanceType; }
    set _instanceType(value: string) { this.instanceType = value; }

    private settings: string = "{}";
    public onSettingsChange: BehaviorSubject<any>;
    get _settings(): any {
        if (this.settings == "" || !this.settings) {
            this.settings = "{}"
        }
        return JSON.parse(this.settings);
    }
    set _settings(value: any) {

        this.settings = JSON.stringify(value);

        this.onSettingsChange.next(this._settings)
        
    }

    private value: any = "";
    getValue(): any { return this.value; }
    setValue(value: any) { this.value = value; }

    private visibility: boolean = true;
    get _visibility(): boolean { return this.visibility; }
    set _visibility(visibility: boolean) { this.visibility = visibility; }

    private enabled: boolean = true;
    get _enabled(): boolean { return this.enabled; }
    set _enabled(enabled: boolean) { this.enabled = enabled; }
}

export class PartialForm {
    partialId: string;
    createdDate: Date = null;
    createdId: string = "";
    updatedDate: Date = null;
    updatedId: string = "";
    name: string = "New Form";
    settings: string = "";
    control: Array<Control>;
    event: Array<Event> = new Array<Event>();

    public deleteControl(control: Control, controls?: Array<Control>): boolean {
        if (!controls) {
            controls = this.control;
        }
        var deleted: boolean = false;

        let controlExists = controls.indexOf(control);

        if (controlExists >= 0) {
            controls.splice(controlExists, 1);
            deleted = true;

        } else {
            controls.forEach((currenControl, index, array) => {
                let d = this.deleteControl(control, currenControl.control);
                if (d) {
                    deleted = d;
                }
            });
        }

        return deleted;
    }

    public getControlById(controlId: string, controls?: Array<Control>): Control {
        if (!controls) { controls = this.control; }

        let control = controls.find(c => c.controlId == controlId);

        if (!control) {
            controls.forEach((currentControl, index, array) => {
                control = this.getControlById(controlId, currentControl.control);
            });
        }

        return control;
    }  

    public replaceObjectsWithControls(controls?: Array<Control>) {
        if (!controls) {
            controls = this.control;
        }

        controls.forEach((currentControl, index, array) => {
            let isControl = currentControl instanceof Control
            if (currentControl.control) {
                this.replaceObjectsWithControls(currentControl.control);
            }
            if (!isControl) {
                array[index] = this.setObjectPrototypeControl(currentControl);
            }
        });
    }

    public nullSubscriptionToSettings(controls?: Array<Control>) {
        if (!controls) {
            controls = this.control;
        }

        controls.forEach((currentControl, index, array) => {
            currentControl.onSettingsChange = null;

            if (currentControl.control) {
                this.nullSubscriptionToSettings(currentControl.control);
            }
        });
    }

    private setObjectPrototypeControl(obj: Control): Control {
        let control = Object.assign(new Control(obj.controlTypeId), obj);
        control.onSettingsChange = Object.assign(new BehaviorSubject(null), control.onSettingsChange);
        control.order = null;
        return control;
    }

    public replaceObjectsWithEvents(events?: Array<Event>) {
        if (!events) {
            events = this.event;
        }

        events.forEach((currentEvent, index, array) => {
            let isEvent = currentEvent instanceof Event;
            if (!isEvent) {
                array[index] = this.setObjectPrototypeEvent(currentEvent);
            }
            if (currentEvent.rule) {
                currentEvent.rule.forEach((currentRule, index, array) => {
                    let isRule = currentRule instanceof Rule;
                    array[index] = this.setObjectPrototypeRule(currentRule);
                })
            }
        });
    }

    private setObjectPrototypeEvent(obj: Event): Event {
        let event = Object.assign(new Event(obj.eventName, obj.controlId), obj);
        return event;
    }

    private setObjectPrototypeRule(obj: Rule): Rule {
        let rule = Object.assign(new Rule(obj.ruleName), obj);
        return rule;
    }

    public getAllControls(controls?: Array<Control>): Array<Control> {
        if (!controls) {
            controls = this.control;
        }

        let controlArray: Array<Control> = new Array<Control>();

        for (let control of controls) {
            if (control.control.length > 0) {
                this.getAllControls(control.control).forEach((currentControl, index, array) => {
                    controlArray.push(currentControl);
                });
            }
            controlArray.push(control);
        }

        return controlArray;
    }
}

export class Rule {
    constructor(ruleName: string) {
        this.ruleName = ruleName;
    }
    ruleId: string = null;
    ruleName: string = null;
    createdDate: Date = null;
    createdId: string = null;
    updatedDate: Date = null;
    updatedId: string = null;
    triggerFunctionId: string = null;
    triggerFunction: () => any = null;
    triggerComponentId: string = null;
    _triggerComponent: any = null;
    set triggerComponent(component: any) {
        this._triggerComponent = component;
        this.triggerFunction = () => {
            this._triggerComponent["triggerFunction"]();
        }
    }
    private _ruleSettings: string = "{}";
    get ruleSettings(): any {
        return JSON.parse(this._ruleSettings);
    }
    set ruleSettings(value: any) {
        this._ruleSettings = JSON.stringify(value);
    }
}

export class Event {
    constructor(eventName: string, controlId?: string) {
        this.eventName = eventName;
        this.controlId = controlId;
    }

    createRule(rule: Rule) {
        this.rule.push(rule);
    }

    removeRule(rule: Rule) {
        this.rule.splice(this.rule.indexOf(rule), 1);
    }

    triggerRules() {
        this.rule.forEach((currentRule, index, array) => {
            currentRule.triggerFunction();
        });
    }
    eventId: string = null;
    eventName: string = null;
    controlId: string = null;
    rule: Array<Rule> = new Array<Rule>();
    createdDate: Date = null;
    createdId: string = "";
    updatedDate: Date = null;
    updatedId: string = "";
}

export class ControlDefinition {
    controlTypeId: string = null;
    createdDate: Date = null;
    createdId: string = null; 
    updatedDate: Date = null;
    updatedId: Date = null;
    catagory: string = null;
    componentName: string = null;
    description: string = null;
    controlName: string = null;
}

export class FormEventTypes {
    static Starting = "starting";
    static Started = "started";
    static Refresh = "refresh";
}


