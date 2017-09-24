import { Component, Output, EventEmitter } from '@angular/core';
import { Control, ControlDefinition } from '../../app.model';
import { LayoutControl } from '../../app.model.layoutcontrol'
import { EventsService } from "../../services/events.service";

import { ControlRowComponent } from "../controlrow/controlrow.component";
import { ControlHeadingComponent } from "../controlheading/controlheading.component";
import { ControlTextboxComponent } from "../controltextbox/controltextbox.component";
import { ControlColumnComponent } from "../controlcolumn/controlcolumn.component";
import { ControlDropdownComponent } from "../controldropdown/controldropdown.component";
import { ControlMultiselectComponent } from "../controlmultiselect/controlmultiselect.component";
import { ControlTextareaComponent } from "../controltextarea/controltextarea.component";
import { ControlRadiolistComponent } from "../controlradiolist/controlradiolist.component";
import { ControlButtonComponent } from "../controlbutton/controlbutton.component";
import { ControlDefinitionService } from "../../services/controldefinition.service";

@Component({
    selector: 'form-controls',
    templateUrl: './formcontrols.component.html',
    styleUrls: ['./formcontrols.component.css']
})
export class FormControlsComponent {
    @Output() saveFormEvent = new EventEmitter();
    @Output() controlsLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
    Controls: Array<Control> = new Array<Control>();
    Catagories: Array<any> = new Array<any>();
    private toggleClick: boolean = false;
    


    //Components = [
    //    { cmp: ControlRowComponent, name: "ControlRowComponenet" },
    //    { cmp: ControlColumnComponent, name: "ControlColumnComponent" },
    //    { cmp: ControlHeadingComponent, name: "ControlHeadingComponent" },
    //    { cmp: ControlTextboxComponent, name: "ControlTextboxComponent" },
    //    { cmp: ControlDropdownComponent, name: "ControlDropdownComponent" },
    //    { cmp: ControlMultiselectComponent, name: "ControlMultiselectComponent" },
    //    { cmp: ControlTextareaComponent, name: "ControlTextareaComponent" },
    //    { cmp: ControlRadiolistComponent, name: "ControlRadiolistComponent" },
    //    { cmp: ControlButtonComponent, name: "ControlButtonComponent" },
    //];

    constructor(public eventsService: EventsService, private controlDefinitionService: ControlDefinitionService) {  }

    ngOnInit() {
        this.controlDefinitionService.getAllControlDefinitions().subscribe((controlDefs: Array<ControlDefinition>) => {
            this.controlsLoaded.emit(false);

            this.Catagories = this.generateAvailableControls(controlDefs);

            if (this.Catagories.length > 0) {
                this.controlsLoaded.emit(true);
            }
        });
    }

    generateAvailableControls(defs: Array<ControlDefinition>): Array<any> {
        let Categories: Array<any> = new Array<any>();
        let Controls: Array<Control> = new Array<Control>();

        defs.forEach((def, index, array) => {
            let newControl: Control = new Control(def.componentName);
            newControl.order = -1;
            Controls.push(newControl);

            let existingCatagory = Categories.find(cat => cat.catagoryName == def.catagory);
            if (!existingCatagory) {
                existingCatagory = { catagoryName: def.catagory, controls: new Array<Control>(), displayNameMap: new Array<any>() };
                Categories.push(existingCatagory);
            }

            existingCatagory.controls.push(newControl);
            existingCatagory.displayNameMap.push({ displayName: def.controlName, controlIndex: existingCatagory.controls.indexOf(newControl)})
        });

        return Categories;
    }

    getDisplayName(control: Control, Catagory: any): string {
        let val = Catagory.displayNameMap.find(d => d.controlIndex == Catagory.controls.indexOf(control));
        return val.displayName;
    }

    public saveForm() {
        this.saveFormEvent.emit(null);
    }

    private toggleMenu(event) {
        //this.toggleClick = !this.toggleClick;
        event.currentTarget.classList.toggle("active");
        event.preventDefault();
    }
}
