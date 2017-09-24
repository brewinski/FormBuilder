import { Component, Input} from '@angular/core';
import { Control, Rule } from '../../app.model';
import { EventsService } from "../../services/events.service";
import { DropdownSettings, Option, TextSettings, InputDataTypes } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";
import { Http } from "@angular/http";

@Component({
    selector: 'rule-webservice',
    templateUrl: './rulewebservice.component.html',
    styleUrls: ['./rulewebservice.component.css']
})
export class RuleWebServiceComponent {
    @Input() rule: Rule;

    private availableControls: Array<Control> = new Array<Control>();
    private serviceUrl: string = "";
    private body: any = {};
    private requestType: string = "";
    private requestTypes: Array<string> = new Array<string>(
        "Get",
        "Post",
        "Put",
        "Delete",
    );
    //Settings Tab Properties

    constructor(
        private eventsService: EventsService,
        private formManagerService: FormManagerService,
        private http: Http
    ) {

    }

    ngOnInit() {
        this.formManagerService.subscribeToInputControls().subscribe(
            (controls: Array<Control>) => {
                this.availableControls = controls;
            },
            error => {
                alert(error);
            }
        );
        this.getSettings();
        this.rule.triggerComponent = this;
    }

    //When the rule is triggered execute this.
    triggerFunction() {
        if (this.serviceUrl) {
            this.accessWebService();
        }
    }

    accessWebService() {
        switch (this.requestType) {
            case "Get":
                console.log("get");
                this.http.get(this.serviceUrl)
                    .map((res) => <Object>res.json())
                    .do(data => {
                        alert(data)
                    }).subscribe(data => {
                        alert(data);
                    });
                break;
            case "Post":
                console.log("post");
                this.http.get(this.serviceUrl);
                break;
            case "Put":
                console.log("put");
                break;
            case "Delete":
                console.log("delete");
                this.http.delete(this.serviceUrl);
                break
            default:
                console.log("This rule is incomplete");
                break;
        }
    }

    onError(error: Response) {
        console.log(error);
    }

    setRuleName() {
        let name: string = "WebService";
        this.rule.ruleName = name;
    }

    getSettings() {
        if (this.rule.ruleSettings._serviceUrl) {
            this.serviceUrl = this.rule.ruleSettings._serviceUrl;
        }
        else {
            this.rule.ruleSettings._serviceUrl = this.serviceUrl;
        }
        if (this.rule.ruleSettings._requestType) {
            this.requestType = this.rule.ruleSettings._requestType;
        }
        else {
            this.rule.ruleSettings._requestType = this.requestType;
        }
    }

    setSettings() {
        let rsettings = this.rule.ruleSettings;
        rsettings._serviceUrl = this.serviceUrl;
        rsettings._requestType = this.requestType;
        this.rule.ruleSettings = rsettings;
    }
}
