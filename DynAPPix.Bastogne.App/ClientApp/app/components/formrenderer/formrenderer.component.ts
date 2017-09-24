import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { PartialFormService } from '../../services/partialform.service';
import { Control, PartialForm } from '../../app.model';

import { LayoutControl } from "../../app.model.layoutcontrol";
import { EventsService } from "../../services/events.service";
import { FormManagerService } from "../../services/formmanager.service";
import * as html2canvas from "html2canvas";

@Component({
    selector: 'form-renderer',
    templateUrl: './formrenderer.component.html',
    styleUrls: ['./formrenderer.component.css'],
    providers: [PartialFormService]
})
    
export class FormRendererComponent extends LayoutControl{

    @Input('formid') id: string;

    @Output() deleteFormEvent = new EventEmitter();
    @Output() LoadedState: EventEmitter<boolean> = new EventEmitter<boolean>();

    sub: Subscription;
    form: PartialForm = new PartialForm();
    currentComponent: any;
    dataLoaded: boolean = false;
    errorMessage: string;

    @ViewChild('mycanvas') canvasRef: ElementRef;
    @ViewChild('formrenderer') formRef: ElementRef;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private formService: PartialFormService,
        formManagerService: FormManagerService,
        eventsService: EventsService) {
        super(eventsService, formManagerService);
    }

    ngOnInit() {
        this.formManagerService.susbscribeToForm().subscribe((form: PartialForm) => {
            this.form = form;
            //Using behavior subject returns the current value on subscribe. (possible to be null..)
            if (form != null) {
                this.dataLoaded = true;
            }
            else {
                this.dataLoaded = false;
            }
            this.LoadedState.emit(this.dataLoaded);
        }, (error) => {
            alert(error);
            
        });
    }

    saveForm() {
        this.dataLoaded = false;
        this.formService.saveForm(this.form)
            .subscribe(
            (form) => {
                this.form = form;
                this.dataLoaded = true;
            },
                error => this.errorMessage = <any>error
            );
    }

    deleteForm() {
        if (confirm("Are you sure you want to delete this form?")) {
            this.formService.deleteForm(this.form.partialId)
                .subscribe(
                    data => console.log(data),
                    error => this.errorMessage = <any>error,
                    function () {
                        this.router.navigateByUrl('/home');
                    }
                )                
            this.router.navigateByUrl('/home');
            this.deleteFormEvent.emit(null);
        }
    }

    createScreenShot() {

    }

    test() {
        var Element = document.getElementById('builder-section');
        var RenderElem = document.getElementById('formrenderer');
        //Element.style.overflowY = "visible";
        //RenderElem.style.overflowY = "visible";

        var destinationEmail = prompt("Enter the email destination email address");

        // Create clone of element
        var clone = <HTMLElement>RenderElem.cloneNode(true);

        // Position element relatively within the 
        // body but still out of the viewport
        var style = clone.style;
        style.position = 'relative';
        style.top = window.innerHeight + 'px';
        style.left = "0";

        // Append clone to body and return the clone
        document.body.appendChild(clone);

        html2canvas(clone, {
            //width: RenderElem.clientWidth,
            height: clone.clientHeight
        }).then(canvas => {
            var imgData = canvas.toDataURL("image/png");
            //this.AddImagesResource(imgData);
            this.formService.sendForImplementation(imgData, this.formManagerService.subscribeToInputControls().value, this.form.partialId, this.form.name, destinationEmail, "Unknown").subscribe((test123) => {
                console.log("I've done it!")
            });
            Element.appendChild(canvas);
            
            clone.remove();
            canvas.remove();
        });
    }
}

