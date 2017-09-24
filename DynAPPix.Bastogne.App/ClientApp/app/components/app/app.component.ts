import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public showNavigation = true;
    
    constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
        router.events.subscribe(value => {
            this.showNavigation = !router.isActive('/runtime', false) && !router.isActive('/login', false);
        });

        this.toastr.setRootViewContainerRef(vcr);
    }

    createFormClick() {
        this.router.navigateByUrl('/create');
    }

    public disabled = false;
    public status: { isopen: boolean } = { isopen: false };

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit() {
        //$.AdminLTE.init();
    }
}
