import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EventsService } from "../../services/events.service";
import { PartialFormService } from "../../services/partialform.service";
import { FormManagerService } from "../../services/formmanager.service";

@Component( {
    selector: 'formbuilder-header',
    styleUrls: ['./formbuilder-header.component.css'],
    templateUrl: './formbuilder-header.component.html'
})
export class FormBuilderHeaderComponent {
    @Output() NavigateToRules: EventEmitter<any> = new EventEmitter<any>();
    @Output() NavigateToToolbox: EventEmitter<any> = new EventEmitter<any>();
    @Output() SendImplementationEmail: EventEmitter<any> = new EventEmitter<any>();

    @Output() SaveForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() DeleteForm: EventEmitter<any> = new EventEmitter<any>();

    private formId: string;
    private isRules: boolean;
    private heading: string = "Form Builder";


    constructor(
        private router: Router,
        private eventsService: EventsService,
        private formService: PartialFormService,
        private formManagerService: FormManagerService,
      ) {
        // TODO
    }

    ngOnInit() {
        this.formManagerService.susbscribeToForm().subscribe(
            (form) => {
                if(form)
                    this.formId = form.partialId;
            },
            (error) => {
                alert(error);
            }
        ); 
    }

    createFormClick() {
        this.router.navigate(['create']);
    }

    saveForm() {
        this.SaveForm.emit(null);
        //this.formManagerService.saveForm();
    }

    deleteForm() {
        this.DeleteForm.emit(null);
        this.formManagerService.deleteForm();
    }

    navigateToRules(event): void {
        this.isRules = true;
        this.heading = "Events Builder";
        this.NavigateToRules.emit({event: event, name: "rules"});
    }

    navigateToToolbox(event): void {
        this.isRules = false;
        this.heading = "Form Builder";
        this.NavigateToToolbox.emit({event: event, name: "tools"});
    }

    sendImplementationEmail(): void {
        this.SendImplementationEmail.emit(null);
    }
}
