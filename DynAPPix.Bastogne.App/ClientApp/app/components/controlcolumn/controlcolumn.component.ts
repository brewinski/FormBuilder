/// <reference path="../controlheading/controlheading.component.ts" />
import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Control } from '../../app.model';
import { DragulaService, dragula } from 'ng2-dragula';
import { LayoutControl } from "../../app.model.layoutcontrol";
import { EventsService } from "../../services/events.service";
import { DropdownSettings, Option, DropdownConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";
import * as $ from 'jquery';

@Component({
    selector: 'control-column',
    templateUrl: './controlcolumn.component.html',
    styleUrls: ['./controlcolumn.component.css']
})
export class ControlColumnComponent extends LayoutControl{
    @Input() object: Control;
    @Input() index: number;

    @ViewChild('column') columnRef: ElementRef;

    @Output() onMoving: EventEmitter<any> = new EventEmitter<any>();
    @Output() resizeLeft: EventEmitter<any> = new EventEmitter<any>();
    @Output() resizeRight: EventEmitter<any> = new EventEmitter<any>();

    "_Column Width": DropdownConstructor = new DropdownConstructor("Column Width (1 to 12)",
        [
            new Option("Column Width 1", "col-sm-1"),
            new Option("Column Width 2", "col-sm-2"),
            new Option("Column Width 3", "col-sm-3"),
            new Option("Column Width 4", "col-sm-4"),
            new Option("Column Width 5", "col-sm-5"),
            new Option("Column Width 6", "col-sm-6"),
            new Option("Column Width 7", "col-sm-7"),
            new Option("Column Width 8", "col-sm-8"),
            new Option("Column Width 9", "col-sm-9"),
            new Option("Column Width 10", "col-sm-10"),
            new Option("Column Width 11", "col-sm-11"),
            new Option("Column Width 12", "col-sm-12")
        ],
        () => {
            this.mapPropertiesToJson(null);
        },
        "General"
    );

    _ColumnOffset: DropdownConstructor = new DropdownConstructor("Column Offset (1 to 12)",
        [
            new Option("Column Offset 1", "col-sm-offset-1"),
            new Option("Column Offset 2", "col-sm-offset-2"),
            new Option("Column Offset 3", "col-sm-offset-3"),
            new Option("Column Offset 4", "col-sm-offset-4"),
            new Option("Column Offset 5", "col-sm-offset-5"),
            new Option("Column Offset 6", "col-sm-offset-6"),
            new Option("Column Offset 7", "col-sm-offset-7"),
            new Option("Column Offset 8", "col-sm-offset-8"),
            new Option("Column Offset 9", "col-sm-offset-9"),
            new Option("Column Offset 10", "col-sm-offset-10"),
            new Option("Column Offset 11", "col-sm-offset-11"),
            new Option("Column Offset 12", "col-sm-offset-12")
        ],
        () => {
            this.mapPropertiesToJson(null);
        },
        "General"
    );

    constructor(eventsService: EventsService, formManagerService: FormManagerService) {
        super(eventsService, formManagerService);
        console.log(this.index);
    }

    ngOnInit() {
        this.mapPropertiesFromJson();
        if (!this.object.control) {
            this.object.control = new Array<Control>();
        }

        this.object.onSettingsChange.subscribe(
            (value) => {
                this.mapPropertiesFromJson();
            }
        );
        
    }

    emitMoveStart(): void {
        //might need to emit direction information
        this.onMoving.emit(true);
    }


    emitMoveEnd(): void {
        //might need to emit direction information
        this.onMoving.emit(false);
    }

    emitResizeLeftStart(): void {
        //might need to emit direction information
        this.resizeLeft.emit(true);
    }

    emitResizeLeftEnd(): void {
        //might need to emit direction information
        this.resizeLeft.emit(false);
    }

    emitResizeRightStart(): void {
        //might need to emit direction information
        this.resizeRight.emit(true);
    }

    emitResizeRightEnd(): void {
        //might need to emit direction information
        this.resizeRight.emit(false);
    }

    mapPropertiesFromJson() {
        if (!this.object)
            return;

        let settings = this.object._settings;
        this["_Column Width"].value = settings["_Column Width"] || "col-md-6";
        this["_ColumnOffset"].value = settings["_ColumnOffset"] || "col-md-offset-0";
    }

    mapPropertiesToJson(event) {
        let settings = this.object._settings;
        settings["_Column Width"] = this["_Column Width"].value;
        settings["_ColumnOffset"] = this["_ColumnOffset"].value;
        this.object._settings = settings;
    }
}
