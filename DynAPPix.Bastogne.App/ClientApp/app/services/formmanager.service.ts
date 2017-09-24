import { Injectable, EventEmitter, Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Control, PartialForm, Event, FormEventTypes, Rule } from '../app.model';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PartialFormService } from "./partialform.service";

@Injectable()
export class FormManagerService {
    //Services
    private route: ActivatedRoute;
    private formService: PartialFormService
    private router: Router;

    //private form: PartialForm;
    private formChange: BehaviorSubject<PartialForm> = new BehaviorSubject<PartialForm>(null);
    private formEvents: BehaviorSubject<Array<Event>> = new BehaviorSubject<Array<Event>>(null);
    private allFormControls: BehaviorSubject<Array<Control>> = new BehaviorSubject<Array<Control>>(null);
    private allInputFormControls: BehaviorSubject<Array<Control>> = new BehaviorSubject<Array<Control>>(null);
    private allLayoutFormControls: BehaviorSubject<Array<Control>> = new BehaviorSubject<Array<Control>>(null);

    //the selected from control for delete and the settings panel
    private selectedControl: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // ----------------------------------------------------------------
    // SETUP 
    // ----------------------------------------------------------------
    constructor(
        route: ActivatedRoute,
        formService: PartialFormService,
        router: Router,
    ) {
        //TODO: Construct
        this.route = route;
        this.router = router;
        this.formService = formService


        //Subscribe to the route.
        this.route.params
            .subscribe((params: Params) => {
                this.getFormFromDatbase(params['id']);
            }
        );
    }

    // GetFormFrom PFSvc on route change
    private getFormFromDatbase(id: string) {
        this.formService.getForm(id).subscribe((form) => {
            this.formChange.next(form);
            this.formEvents.next(form.event);
            this.allInputFormControls.next(this.formChange.value.getAllControls().filter(c => c._settings._instanceType == "input"));
            this.allLayoutFormControls.next(this.formChange.value.getAllControls().filter(c => c._settings._instanceType != "input"));
            this.allFormControls.next(this.formChange.value.getAllControls());
        });
    }


    //------------------------------------------------------------------------------------------
    // SUBSCRIBERS: Theses methods allow subscription to parts of the form they need. -----------
    //------------------------------------------------------------------------------------------

    public setFormLoaded(): void {
        let a = this.formChange.value.getAllControls().filter(c => c._instanceType == "input");

        this.allInputFormControls.next(this.formChange.value.getAllControls().filter(c => c._instanceType == "input"));
        this.allLayoutFormControls.next(this.formChange.value.getAllControls().filter(c => c._instanceType != "input"));
        this.allFormControls.next(this.formChange.value.getAllControls());
    }

    //Subscribe to the form.
    public susbscribeToForm(): BehaviorSubject<PartialForm> {
        return this.formChange;
    }

    //Subscribe to the events on the form.
    public subscribeToFormEvents(): BehaviorSubject<Array<Event>> {
        return this.formEvents;
    }

    //Subscribe to the form Controls
    public subscribeToFormControls(): BehaviorSubject<Array<Control>> {
        return this.allFormControls;
    }

    //Subscribe to the input controls
    public subscribeToInputControls(): BehaviorSubject<Array<Control>> {
        //TODO: return the behavior subject that watches the input controls
        return this.allInputFormControls;
    }

    //Subscribe to the layout controls
    public subscribeToLayoutControls(): BehaviorSubject<Array<Control>> {
        //TODO: return the behaviorsubject that watches the layout controls
        return this.allLayoutFormControls;
    }

    public subscribeToSelectedControl(): BehaviorSubject<any> {
        return this.selectedControl;
    }

    // ------------------------------------------------------------------
    // LOGIC: Create read update delete will update the current form and all it's elements. 
    //        Any subscribed componenets will get an updated copy of the form.
    // -------------------------------------------------------------------

    public updateControlPrototype() {
        this.formChange.value.replaceObjectsWithControls();
    }

    //saves the current form
    public saveForm() {
        this.formService.saveForm(this.formChange.value)
            .subscribe(
            form => this.formChange.next(form),
            error => alert(error)
        );
    }

    //deletes the current form.
    public deleteForm() {
        if (confirm("Are you sure you want to delete this form?")) {
            this.formService.deleteForm(this.formChange.value.partialId)
                .subscribe(
                data => console.log(data),
                error => alert(error),
                function () {
                    this.router.navigateByUrl('/home');
                }
                )
            this.router.navigateByUrl('/home');
            //this.deleteFormEvent.emit(null);
        }
    }

    //-----------------------------------------------------------------------
    //LOGIC: Sets the selected control on the form builder.
    //-----------------------------------------------------------------------


    public setSelectedControl(component: any) {
        this.selectedControl.next(component)
    }

    public removeControl() {
        this.formChange.value.deleteControl(this.selectedControl.value["object"]);
        this.selectedControl.next(null);
    }

    //-----------------------------------------------------------------------
    // HELPER FUNCTIONS: 
    //---------------------------------------------------------------------
    //get all the controls on the form
    public getAllControls(): Array<Control> {
        return this.getAllControlsOnTheForm(this.formChange.value.control); 
    }

    //get all the layout controls on the form
    public getLayoutControls(): Array<Control> {
        return this.getLayoutControlsOnTheForm(this.formChange.value.control);
    }

    //get all the input controls on the form
    getInputControls(): Array<Control> {
        return this.getInputControlsOnTheForm(this.formChange.value.control);
    }

    private getAllControlsOnTheForm(controls: Array<Control>): Array<Control> {
        let tempControls = new Array<Control>();
        for (let control of controls) {
            if (control.control) {
                this.getAllControlsOnTheForm(control.control).forEach(function (currentControl, index, array) {
                        tempControls.push(currentControl);
                });
            }
            tempControls.push(control);
        }
        return tempControls;
    }

    private getInputControlsOnTheForm(controls: Array<Control>): Array<Control> {
        let tempControls = new Array<Control>();
        for (let control of controls) {
            if (control.control) {
                this.getAllControlsOnTheForm(control.control).forEach(function (currentControl, index, array) {
                    if (currentControl._instanceType == 'input')
                        tempControls.push(currentControl);
                });
            }
            if (control._instanceType == 'input')
                tempControls.push(control);
        }
        return tempControls;
    }

    private getLayoutControlsOnTheForm(controls: Array<Control>): Array<Control> {
        let tempControls = new Array<Control>();
        for (let control of controls) {
            if (control.control) {
                this.getAllControlsOnTheForm(control.control).forEach(function (currentControl, index, array) {
                    if (currentControl._instanceType != 'input')
                        tempControls.push(currentControl);
                });
            }
            if (control._instanceType != 'input')
                tempControls.push(control);
        }
        return tempControls;
    }
}