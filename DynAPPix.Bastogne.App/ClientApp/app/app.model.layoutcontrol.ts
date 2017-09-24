// Always call the setup function in the samemodule, in case this module
// evaluates first.
import { Component, HostListener, Input } from "@angular/core";
import { Control } from "./app.model";
import { EventsService } from "./services/events.service";
import { FormManagerService } from "./services/formmanager.service";

@Component({
    host: {
        "(click)": "setSelectedControl($event)"
    }
})
export abstract class LayoutControl {

    //TODO generate component map from database. 
    private ComponentMap: object = {
        "row": ControlRowComponent,
        "headding": ControlHeadingComponent,
        "column": ControlColumnComponent,
        "textbox": ControlTextboxComponent,
        "ControlRowComponent": ControlRowComponent,
        "ControlHeadingComponent": ControlHeadingComponent,
        "ControlColumnComponent": ControlColumnComponent,
        "ControlTextboxComponent": ControlTextboxComponent,
        "ControlDropdownComponent": ControlDropdownComponent,
        "ControlMultiselectComponent": ControlMultiselectComponent,
        "ControlTextareaComponent": ControlTextareaComponent,
        "ControlRadiolistComponent": ControlRadiolistComponent,
        "ControlButtonComponent": ControlButtonComponent,
    };

    //TODO dynamicaly generate component list
    Components = [
        ControlRowComponent,
        ControlColumnComponent,
        ControlHeadingComponent,
        ControlTextboxComponent,
        ControlDropdownComponent,
        ControlMultiselectComponent,
        ControlTextareaComponent,
        ControlRadiolistComponent,
        ControlButtonComponent,
    ];

    constructor(public eventsService: EventsService, public formManagerService: FormManagerService) { }

    generateInput(object: Control, index: number): any {
        let inputs = {
            object: object,
            index: index
        };
        //console.log(inputs);
        return inputs;
    }

    generateComponent(Component: string, Self: Control): any {
        let newComponent = this.ComponentMap[Component.trim()];
        return newComponent || ControlRowComponent;
    }

    @HostListener('click', ['$event'])
    setSelectedControl(event) {
        event.stopPropagation();
        this.formManagerService.setSelectedControl(this);
    }

    convertSettings(objSettings: string): any {
        let settings;
        try {
            if (objSettings == null) {
                throw Error;
            }
            settings = JSON.parse(objSettings);
            return settings;
        } catch (e) {
            return settings = {};
        }
    }


}

import { ControlRowComponent } from "./components/controlrow/controlrow.component";
import { ControlHeadingComponent } from "./components/controlheading/controlheading.component";
import { ControlTextboxComponent } from "./components/controltextbox/controltextbox.component";
import { ControlColumnComponent } from "./components/controlcolumn/controlcolumn.component";
import { ControlDropdownComponent } from "./components/controldropdown/controldropdown.component";
import { ControlMultiselectComponent } from "./components/controlmultiselect/controlmultiselect.component";
import { ControlTextareaComponent } from "./components/controltextarea/controltextarea.component";
import { ControlRadiolistComponent } from "./components/controlradiolist/controlradiolist.component";
import { ControlButtonComponent } from "./components/controlbutton/controlbutton.component";



