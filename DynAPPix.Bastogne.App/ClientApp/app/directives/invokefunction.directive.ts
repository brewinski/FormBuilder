﻿import { Directive, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';

@Directive({
    selector: '[ad-host]',

})
export class AdDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}