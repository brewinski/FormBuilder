import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { Event, Rule } from "../../app.model";
import { EventsService } from "../../services/events.service";
import { RuleDataTransferComponent } from '../ruledatatransfer/ruledatatransfer.component';
import { RuleSetVisibilityComponent } from '../rulesetvisibility/rulesetvisibility.component';
import { RuleWebServiceComponent } from "../rulewebservice/rulewebservice.component";

@Component({
    selector: 'form-rules-builder',
    templateUrl: './formrulesbuilder.component.html',
    styleUrls: ['./formrulesbuilder.component.css'],
})
export class FormRulesBuilderComponent {
    private availableEvents: Array<Event> = new Array<Event>();
    private ComponentMap: object = {
        "TransferData": RuleDataTransferComponent,
        "SetVisibility": RuleSetVisibilityComponent,
        "WebService": RuleWebServiceComponent,
    };
    private ruleName: string;

    constructor(private eventsService: EventsService) {

    }

    ngOnInit() {
        this.eventsService.EventsChange.subscribe((value) => {
            this.availableEvents = this.eventsService.getEvents();
        });
    }

    removeEvent(Event: Event) {
        this.eventsService.removeEvent(Event);
    }

    addComponent(event: Event, ruleName: string) {
        event.createRule(new Rule(ruleName));
    }

    execute(event: Event) {
        this.eventsService.triggerFormRule(event.eventName, null);
    }

    generateComponent(ruleName: string): Component {
        return this.ComponentMap[ruleName];
    }

    generateInput(rule: Rule): any {
        let inputs = {
            rule: rule,
        };
        //console.log(inputs);
        return inputs;
    }
}

