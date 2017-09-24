import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private dragulaService: DragulaService) {
        //dragulaService.setOptions('bag-two', {
            //moves: function (el, container, handle) {
            //return handle.className === 'handle';
            //}
        //});
        console.log("Started!");
    }
}
