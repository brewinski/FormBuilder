import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ControlDefinition } from '../app.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



//TODO - Alter all the map functions on the HTTP requests and make sure that data is actualy cast to the type and not just assumes as the type.
//TODO - Create a single function that does the casting an returns the form.
@Injectable()
export class ControlDefinitionService {
    output: Observable<Response>;
    protected apiUrl: string = '/api/controldefinitions';
    constructor(private http: Http, private toastr: ToastsManager) {}

    extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    castFormObjectsToTypes(controlDefinitions: Array<ControlDefinition>) {
        //cast partial form to type partial form.
        controlDefinitions.forEach((def, index, array) => {
            def = Object.assign(new ControlDefinition, def);
        });

        //return form.
        return controlDefinitions;
    }

    getAllControlDefinitions(): Observable<ControlDefinition[]> {
        return this.http.get(this.apiUrl)
            .map(res => this.castFormObjectsToTypes( <ControlDefinition[]> res.json()))
            .do(data => {
                console.log(data);
                this.toastr.success('Loaded all control definitions', 'Success');
            })
            .catch(this.handleError);
    }

    getControlDefinition(id: string): Observable<ControlDefinition> {
        //this.output = this.http.get('/api/partialforms/' + id);
        console.log(this.apiUrl + id);
        return this.http.get(this.apiUrl + id)
            .map(res => <ControlDefinition>res.json())
            .do(data => {
                console.log(data);
                this.toastr.success('Loaded form "' + data.controlName + '"', 'Control Definition loaded');
            })
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