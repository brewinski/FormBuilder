import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from "../../services/events.service";
import { DragulaService } from "ng2-dragula";
import { FormManagerService } from "../../services/formmanager.service";
import { PartialFormService } from "../../services/partialform.service";

@Component({
    selector: 'form-runtime',
    templateUrl: './formruntime.component.html',
    styleUrls: ['./formruntime.component.css'],
    providers: [EventsService, FormManagerService, PartialFormService],
    encapsulation: ViewEncapsulation.None,
})
export class FormRuntimeComponent {
    id: string;
    laodRules: boolean = false;

    constructor(private route: ActivatedRoute,
        private eventsService: EventsService,
        private dragulaService: DragulaService,
        private formManagerService: FormManagerService
    ) {
        console.log("Form Runtime Started");
    }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.id = params['id'];
            });
        this.eventsService.setContext(false);

        const bag: any = this.dragulaService.find('myBag');
        if (bag !== undefined) this.dragulaService.destroy('myBag');
        this.dragulaService.setOptions('myBag', {
            revertOnSpill: true,
            accepts: function (el, target, source, sibling) {
                    return false
            },
            moves: function (el, container, handle) {
                return false;
            },
            copy: (el, source) => {
                return  false
            },
            copySortSource: false,
        });
        this.eventsService.setContext(false);
    }

    click() {
        this.laodRules = true;
        this.formManagerService.setFormLoaded();
    }
}
