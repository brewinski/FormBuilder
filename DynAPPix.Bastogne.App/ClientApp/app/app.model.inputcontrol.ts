// Always call the setup function in the samemodule, in case this module
// evaluates first.

import { Component, HostListener, Input, HostBinding } from "@angular/core";
import { Control, Event } from "./app.model";
import { EventsService } from "./services/events.service";
import { InputDataTypes, TextboxConstructor, TextareaConstructor, CheckboxConstructor } from "./app.model.settings";
import { FormManagerService } from "./services/formmanager.service";

@Component({
    host: {
        "(click)": "setSelectedControl($event)",
    },
    styles: ['.control-hover: { border: 1px solid lightgrey; }', '.required: {"color: red;"}']
})
export abstract class InputControl {

    private static Identifier: number = 1;
    get Identifier(): number { return InputControl.Identifier; }
    set Identifier(val: number) { InputControl.Identifier = val; }

    private static IdentifierList: Array<string> = new Array<string>();
    get IdentifierList(): Array<string> { return InputControl.IdentifierList; }
    set IdentifierList(val: Array<string>) { InputControl.IdentifierList = val; }

    public currentName: string;

    private ControlType: string = "Input";

    private mouseOver: boolean = false;

    private readonly context: boolean;

    @Input() object: Control;

    //Generic Settings

    public _ControlName: TextboxConstructor = new TextboxConstructor("Name",
        () => {
            this.mapPropertiesToJson(null);
            this.keepNameIndividual();
            this.registerEvents();
        },
        InputDataTypes.Text,
        "General"
    );

    public _DesignNotes: TextareaConstructor = new TextareaConstructor("Design Notes",
        () => {
            this.mapPropertiesToJson(null);
        },
        "Design Comments"
    );

    public _ExternalDataRequired: CheckboxConstructor = new CheckboxConstructor("External Data Required?",
        () => {
            this.mapPropertiesToJson(null);
        },
        "Design Comments"
    );

    public _Validation: CheckboxConstructor = new CheckboxConstructor(
        "Required",
        () => {
            this.mapPropertiesToJson(null);
        },
        "Validation"
    );

    // Registering Input Events
    private Events: Array<Event> = new Array<Event>();

    // Will this control be populated from an external source?
    // Dont show at runtime.
    @HostBinding("class.external") get external() {
        if (!this.context) {
            return false
        }
        return this._ExternalDataRequired.value
    }

    //Is this control being hovered.
    //Dont execute at runtime.
    @HostBinding("class.control-hover") get _MouseOver() {
        if (!this.context) {
            return false;
        }
        return this.mouseOver;
    }
    @HostBinding("style.display") get _visibility() { return (this.object._visibility ? 'visible' : 'none'); }
    @HostBinding("attr.disabled") get _enabled() { return !this.object._enabled }

    @HostBinding("class.required") get _required() { return this._Validation.value }


    //Generic Settings

    constructor(public eventsService: EventsService, public formManagerService: FormManagerService) {
        //Set builder or runtime.
        this.context = this.eventsService.getContext();
    }

    //protected ngOnInit() {
    //    this.object.onSettingsChange.subscribe(
    //        (value) => {
    //            this.mapPropertiesToJson(null);
    //        },
    //        (error) => {
    //            alert(error);
    //        }
    //    );
    //}

    @HostListener('mouseover', ['$event'])
    onMouseOver(event: MouseEvent) {
        this.mouseOver = true;
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        this.mouseOver = false;
    }

    @HostListener('click', ['$event'])
    setSelectedControl(event) {
        event.stopPropagation();
        this.formManagerService.setSelectedControl(this);
    }

    protected setIdentifier() {
        let matches;

        if (this._ControlName.value) {
            matches = this._ControlName.value.match(/\d+$/);
        }

        if (matches) {
            let idNumber = parseInt(matches[0], 10);
            idNumber = parseInt(matches[0], 10);

            if (idNumber > this.Identifier)
                this.Identifier = idNumber;

        }
        else if (!matches && !this._ControlName.value) {
            this._ControlName.value = this.ControlType + this.Identifier;
        }

        this.currentName = this._ControlName.value;
        this.IdentifierList.push(this._ControlName.value);
        this.Identifier++;
        this.mapPropertiesToJson(event)
    }

    mapPropertiesToJson(event) {
        let settings = this.object._settings;
        for (var key in this) {
            if (key.startsWith("_")) {
                for (var k in this[key]) {
                    if (k == "value")
                        settings[key] = this[key][k];
                }
            }
        }
        settings._instanceType = "input";
        this.object._settings = settings;
    }

    mapPropertiesFromJson() {
        let settings = this.object._settings;
        for (var key in this) {
            if (key.startsWith("_") && settings[key]) {       
                for (var k in this[key]) {
                    if(k == "value")
                        this[key][k] = settings[key];
                }
            }
        }
    }

    protected keepNameIndividual() {
        if (this.IdentifierList.indexOf(this._ControlName.value) > -1 && this.currentName != this._ControlName.value) {
            alert("Another control has the same name as the name you have selected.");
            this._ControlName.value = this.currentName;

        } else {
            this.IdentifierList.splice(this.IdentifierList.indexOf(this._ControlName.value), 1);
            this.currentName = this._ControlName.value;
            this.IdentifierList.push(this._ControlName.value);
        }
    }

    protected registerEvents(Events?: Array<Event>) {
        if (Events) {
            for (let Event of Events) {
                this.Events.push(Event);
            }
        }
        this.Events.push(new Event("On Changed", this.object.controlId));
        this.Events.push(new Event("On Changing", this.object.controlId));
        this.eventsService.registerEvents(this.Events);
    }
}

