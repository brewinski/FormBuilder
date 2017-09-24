import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Control, PartialForm } from "../../app.model";
import { EventsService } from "../../services/events.service";
import { PartialFormService } from "../../services/partialform.service";
import { FormManagerService } from "../../services/formmanager.service";

@Component({
    selector: 'form-report',
    templateUrl: './formreport.component.html',
    styleUrls: ['./formreport.component.css'],
    providers: [EventsService, PartialFormService, FormManagerService],
    encapsulation: ViewEncapsulation.None,
})
export class FormReportComponent {
    private eventsService: EventsService;
    private dataLoaded: boolean;
    private form: PartialForm;
    private controls: Array<Control> = new Array<Control>();
    
    //eventsService: EventsService;

    constructor(private dragulaService: DragulaService,
        private route: ActivatedRoute,
        private eventService: EventsService,
        private formManagerService: FormManagerService
    )
    {
        this.eventsService = eventService;
    }

    ngOnInit() {
        this.formManagerService.susbscribeToForm().subscribe((form: PartialForm) => {
            this.form = form;
        });

        this.formManagerService.subscribeToFormControls().subscribe((controls: Array<Control>) => {
            this.controls = controls;
        });

        const bag: any = this.dragulaService.find('myBag');
        if (bag !== undefined) this.dragulaService.destroy('myBag');
        this.dragulaService.setOptions('myBag', {

        });
        this.eventsService.setContext(true);
    }
}
