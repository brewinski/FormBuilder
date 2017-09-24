import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Control, PartialForm, Event, Rule } from '../app.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service'; 

//TODO - Alter all the map functions on the HTTP requests and make sure that data is actualy cast to the type and not just assumes as the type.
//TODO - Create a single function that does the casting an returns the form.
@Injectable()
export class PartialFormService {
    output: Observable<Response>;
    controls: Array<Control> = new Array<Control>();
    private currentUser: User = new User();

    constructor(private http: Http, private toastr: ToastsManager, private userServ: UserService) {}

    public ngOnInit() {
        this.userServ.currentUser.subscribe((user: User) => this.currentUser = user);
    }

    extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    castFormObjectsToTypes(form: PartialForm) {
        //cast partial form to type partial form.
        form = Object.assign(new PartialForm(), form);
        form.replaceObjectsWithControls();
        form.replaceObjectsWithEvents();

        //return form.
        return form;
    }

    getAllForms(): Observable<PartialForm[]> {
        return this.http.get('/api/partialforms/getall')
            .map(res => <PartialForm[]>res.json())
            .do(data => {
                console.log(data);
                ///this.toastr.success('Loaded all forms', 'Success');
            })
            .catch(this.handleError);
    }

    getForm(id: string): Observable<PartialForm> {
        //this.output = this.http.get('/api/partialforms/' + id);
        console.log('Getting form ID: ' + id);
        return this.http.get('/api/partialforms/ByGuid/' + id)
            .map(res => this.castFormObjectsToTypes(<PartialForm>res.json()))
            .do(data => {
                console.log(data);
                this.toastr.success('Loaded form "' + data.name + '"', 'Form Loaded');
            })
            .catch(this.handleError);
    }


    createForm(formdata: PartialForm) {
        console.log('Creating new form with name: ' + formdata.name);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        formdata.createdId = this.currentUser._id;
        formdata.createdDate = new Date();

        return this.http.post('/api/partialforms/', formdata)
            .map(res => <PartialForm>res.json())
            .do(data => {
                console.log(data);
                this.toastr.success('New form "' + data.name + '" has been created.', 'Form Created');
            })
            .catch(this.handleError);
    }

    saveForm(formdata: PartialForm) {
        console.log('Saving form: ' + formdata.partialId);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(formdata);
        formdata.event.forEach((currentEvent, index, events) => {
            currentEvent.rule.forEach((currentRule, index, array) => {
                currentRule.triggerFunction = null;
                currentRule.triggerComponent = null;
            });
        });

        formdata.nullSubscriptionToSettings();

        return this.http.post('/api/partialforms/', formdata, options)
            .map(res => this.castFormObjectsToTypes(<PartialForm>res.json()))
            .do(data => {
                console.log(data);
                this.toastr.success('Form ' + data.name + ' has been saved.', 'Form Saved');
            })
            .catch(this.handleError);
    }

    deleteForm(id: string) {
        console.log('Deleting form: ' + id);
        return this.http.delete('/api/partialforms/' + id)
            .map(res => res.json())
            .do(data => this.toastr.success('Form "' + data.name + '" has been deleted.', 'Form Deleted'))
            .catch(this.handleError);
    }

    sendForImplementation(message: string, controls: Array<Control>, formid: string, formname: string, destination: string, username: string) {
        console.log("Sending email for implementation");

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let data = {
            formId: formid,
            formName: formname,
            destinationEmail: destination,
            userName: username,
            message: "<p>Form implementation is required for \"" + formname + "\"</p><p>Please contact <username> for more details.</p>",
            image: message,
            formInputControls: new Array<any>(),
        }

        for (let control of controls) {
            
            let controlInformation = {
                name: control._settings._ControlName ? control._settings._ControlName : "",
                designNotes: control._settings._DesignNotes ? control._settings._DesignNotes : "",
                externalData: control._settings._ExternalDataRequired ? control._settings._ExternalDataRequired : "",
            }

            data.formInputControls.push(controlInformation);
        }

        return this.http.post('/api/mail/', data, options)
            .map(res => res.json())
            .do(data => this.toastr.success('Email sent for implementation'))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);
        this.toastr.error('There was a problem performing that action/n' + error);
        return Observable.throw('Internal server error');
    }
}