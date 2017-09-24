import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ViewContainerRef } from "@angular/core";
import { EventsService } from '../../services/events.service'
import { Control } from "../../app.model";
import { Subscription } from "rxjs/Subscription";
import { DropdownSettings, Option, ISettings, IConstructor, TextSettings, TableSettings, ColumnsSettings, TextareaSettings, CheckboxSettings } from '../../app.model.settings'
import { AdDirective } from "../../directives/invokefunction.directive";
import { FormManagerService } from "../../services/formmanager.service";

interface Group {
    key: string;
    values: Array<IConstructor>;
}

@Component({
    selector: 'form-settings',
    templateUrl: './formsettings.component.html',
    styleUrls: ['./formsettings.component.css'],
    entryComponents: [DropdownSettings, TextSettings, TableSettings, ColumnsSettings, TextareaSettings, CheckboxSettings]
})
export class FormSettingsComponent {
    private Control: any;
    private properties: Array<string> = new Array<string>();
    private groups: Array<Group> = new Array<Group>();

    @ViewChildren(AdDirective, { read: ViewContainerRef }) adHost;

    constructor(private eventsService: EventsService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private formManagerService: FormManagerService) { }

    ngOnInit() {
        this.subscribeToEventService();
        window.setTimeout(() => {
            this.adHost.changes
                .subscribe(() => setTimeout(() => { this.renderComponents() }));
        });
    }

    subscribeToEventService() {

        this.formManagerService.subscribeToSelectedControl().subscribe(
            (selectedControl) => {
                this.Control = selectedControl;
                this.reflectNewObjectProperties();
                this.loadComponent();
            },
            (error) => {
                alert(error);
            }
        );

        //this.eventsService.SelectedControl.subscribe((value) => {
        //    this.Control = this.eventsService.Control;
        //    this.reflectNewObjectProperties();
        //    this.loadComponent();
        //});
    }

    ngOnDestroy() {
        
    }

    renderComponents() {
        for (let ref of this.adHost.toArray()) {
            ref.clear();
        }
        // TODO this loop assumes that the groups are in order and the containers are in order (element 1 view ref is the same group as element 1 group).
        // This might not always be the case and will need updating in the future. If an order element is added this will break.
        for (let prop of this.properties) {
            for (let i = 0; i < this.groups.length; i++) {
                if (this.Control[prop].group == this.groups[i].key) {
                    let viewContainerRef = this.adHost.toArray()[i]

                    let setting = <IConstructor>this.Control[prop]

                    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(setting.component);

                    let componentRef = viewContainerRef.createComponent(componentFactory);

                    (<ISettings>componentRef.instance).construct(<IConstructor>setting);
                }
            }
        }

    }

    loadComponent() {

        this.groups = new Array<Group>();

        for (let prop of this.properties) {

            let setting = <IConstructor>this.Control[prop];

            let existing = this.groups.find(g => g.key == setting.group);

            if (!existing) {

                let obj = {
                    key: setting.group,
                    values: new Array<IConstructor>(),
                }

                this.groups.push(obj);
                existing = this.groups.find(g => g.key == setting.group);
            }

            existing.values.push(setting);

        }
    }

    reflectNewObjectProperties() {
        this.properties = new Array<string>();
        for (var key in this.Control) {
            if ((this.Control.hasOwnProperty(key) && typeof this.Control[key] !== 'function') && key.startsWith("_")) {
                this.properties.push(key);
                console.log();
            }

        }
        console.log(this.properties);
    }

    checkType(type: any) {
       return typeof type;
    }
}
