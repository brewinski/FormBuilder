import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartialFormService } from '../../services/partialform.service';
import { PartialForm } from '../../app.model';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [PartialFormService]
})
export class NavMenuComponent {
    constructor(private _formService: PartialFormService, private router: Router) { }

    private forms: PartialForm[] = [];

    ngOnInit() {
        this._formService.getAllForms()
            .subscribe(
                forms => this.forms = forms);
    }

    logoutClick() {
        this.router.navigateByUrl('/login');
    }

    createFormClick() {
        this.router.navigateByUrl('/create');
    }

    deleteFormClick(id: string) {
        if (confirm("Delete form " + name)) {
            this._formService.deleteForm(id)
                .subscribe(data => console.log(data));
            console.log("Trigger delete event here");
        }
    }
}
