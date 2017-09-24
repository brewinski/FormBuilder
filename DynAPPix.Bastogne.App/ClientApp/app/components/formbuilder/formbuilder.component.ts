import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Control } from "../../app.model";
import { EventsService } from "../../services/events.service";
import { FormManagerService } from "../../services/formmanager.service";
import { ControlDefinitionService } from "../../services/controldefinition.service";
import * as $ from 'jquery';

@Component({
    selector: 'form-builder',
    templateUrl: './formbuilder.component.html',
    styleUrls: ['./formbuilder.component.css'],
    providers: [EventsService, FormManagerService, ControlDefinitionService],
    encapsulation: ViewEncapsulation.None,
})
export class FormBuilderComponent {
    id: string;
    private rulesUrl: boolean = false;
    //eventsService: EventsService;

    constructor (
        private dragulaService: DragulaService,
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private formManagerService: FormManagerService,
        private router: Router
    )
    {
    }

    ngOnInit() {
        this.formManagerService.susbscribeToForm().subscribe((value) => {
            console.log(value);
        }, (error: any) => {
            console.log(error);
        })

        this.route.params
            .subscribe((params: Params) => {
                this.id = params['id'];
            });

        this.router.events.subscribe((val) => {
            console.log(val);
        });

        const bag: any = this.dragulaService.find('myBag');
        if (bag !== undefined) this.dragulaService.destroy('myBag');
        this.dragulaService.setOptions('myBag', {
            revertOnSpill: true,
            accepts: function (el, target, source, sibling) {
                if (target.id === 'controls')
                    return false

                return !el.contains(target);
            },
            invalid: function (el, target) {
                return $(el).hasClass('fa') || $(el).hasClass('ui-resizable-handle');
            },
            //moves: function (el, container, handle) {
            //    return handle.className === 'handle';
            //},
            copy: (el, source) => {
                return source.id === 'controls'
            },
            copySortSource: false,
        });  

        this.dragulaService.dropModel.subscribe((val) => {
            const [bagName, e, el] = val;
            console.log('id is:', e.dataset.id);
            if (e.dataset.id == -1) {
                this.formManagerService.updateControlPrototype();
            }
        });

        this.eventsService.setContext(true);
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == "Delete" && confirm("Are you sure you want to delete this control? All sub-controls will be deleted.")) {
            this.formManagerService.removeControl();
        }
    }

    testOutputs(event) {
        if (event.name == "rules") {
            this.rulesUrl = true;
        }

        if (event.name == "tools") {
            this.rulesUrl = false;
        }
    }
}
