import { Component } from '@angular/core';
import { PartialFormService } from '../../services/partialform.service';
import { PartialForm } from "../../app.model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from "@angular/router";

export class NewForm{
    constructor(
        public name: string,
        public template: string) { }
}


@Component({
    selector: 'form-create',
    templateUrl: './formcreate.component.html',
    providers: [PartialFormService]
})
export class FormCreateComponent {
    form = new PartialForm();
    public newform = new NewForm('New Form', '');  
    public errorMsg = '';
    loading = false;

    constructor(private _formservice: PartialFormService,
        private toastr: ToastsManager,
        private router: Router) {
    }

    ngOnInit() {

    }

    create() {
        this.loading = true;
        this.form.name = this.newform.name;
        this.form.control = JSON.parse(this.newform.template).control;
        this._formservice.createForm(this.form)
            .subscribe(
            data => {
                this.router.navigateByUrl('/formbuilder/'+ data.partialId);
            },
            error => {
                this.toastr.error(error);
                this.loading = false;
            });
    }
}
