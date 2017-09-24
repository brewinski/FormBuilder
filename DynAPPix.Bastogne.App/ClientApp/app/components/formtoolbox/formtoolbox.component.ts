import { Component, ComponentFactoryResolver } from '@angular/core';

@Component({
    selector: 'form-toolbox',
    templateUrl: './formtoolbox.component.html',
    styleUrls: ['./formtoolbox.component.css'],
})
export class FormToolboxComponent {

    private controlsLoaded: boolean = false;
    private get _controlsLoaded(): boolean { return this.controlsLoaded }
    private set _controlsLoaded(state: boolean) { this.controlsLoaded = state; } 

    private controlsExpanded: boolean = true;
    private settingsExpanded: boolean = true;

    constructor() { }

    ngOnInit() {

    }

    toggleControlsCollapse() {
        this.controlsExpanded = !this.controlsExpanded;
    }

    toggleSettingsCollapse() {
        this.settingsExpanded = !this.settingsExpanded;
    }
}
