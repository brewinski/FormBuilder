import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';

import { ControlRowComponent } from '../controlrow/controlrow.component';

//Control Imports

@Component({
    selector: 'form-component-renderer',
    entryComponents: [ControlRowComponent],
    templateUrl: './formcomponentrenderer.component.html',
    styleUrls: ['./formcomponentrenderer.component.css']
})
export  class FormComponentRendererComponent {
    CurrentComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    @Input() set componentData(data: { component: any, inputs: any }) {
        if (!data) {
            return;
        }

        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(data.component);

        // We create the component using the factory and the injector
        let component = factory.create(injector);

        // We insert the component into the dom container
        this.dynamicComponentContainer.insert(component.hostView);

        // We can destroy the old component is we like by calling destroy
        if (this.CurrentComponent) {
            this.CurrentComponent.destroy();
        }

        this.CurrentComponent = component;
    }

    constructor(private resolver: ComponentFactoryResolver) {
        
    }
}
