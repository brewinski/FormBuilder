import { Component, Input} from '@angular/core';
import { Control } from '../../app.model';
import { LayoutControl } from "../../app.model.layoutcontrol";
import { EventsService } from "../../services/events.service";
import { ColumnsSettings, ColumnConstructor } from "../../app.model.settings";
import { FormManagerService } from "../../services/formmanager.service";
import * as $ from 'jquery';
import 'webpack-jquery-ui/css'
import 'webpack-jquery-ui';


export interface ColumnOutputs {
    onMoving: (event) => any;
    resizeLeft: (event) => any;
    resizeRight: (event) => any;
}

@Component({
    selector: 'control-row',
    templateUrl: './controlrow.component.html',
    styleUrls: ['./controlrow.component.css'],
})
export class ControlRowComponent extends LayoutControl{
    @Input() object: Control;

    public "_Columns": ColumnConstructor;


    constructor(eventsService: EventsService, formManagerService: FormManagerService) {
        super(eventsService, formManagerService);
    }

    ngOnInit() {
        this.mapPropertiesFromJson();

        if (!this.object.control) {
            this.object.control = new Array<Control>();
        }
        this._Columns = new ColumnConstructor("Column List",
            () => {
                this.mapPropertiesToJson(null)
            },
            this.object.control,
            "General"
        );

    }

    ngAfterViewInit() {
        var COL_WIDTH = 62; // should be calculated dynamically, and recalculated at window resize
        var GUTTER_WIDTH = 30;

        var COL_WIDTHS = {
            750: 62,
            970: 81,
            1170: 97
        };

        var row = this.object;

        (<any>$('.builder-col')).resizable({
            grid: COL_WIDTH - GUTTER_WIDTH,
            handles: 'e, w',
            resize: function (e, ui) {
                console.log('resized', ui.size)

                let columnIndex: number = $(ui.element).data("index");
                let width: number = Math.max(1, Math.round(ui.size.width / COL_WIDTH));

                let currentColumn: Control = row.control[columnIndex];

                let columnSettings = currentColumn._settings;

                columnSettings["_Column Width"] = width;

                //$(this).css('width', '').removeClass(function (index, css) {
                //    return (css.match(/(^|\s)col-sm-\S+/g) || []).join(' ');
                //})
                //    .addClass('col-sm-' + Math.max(1, Math.round(ui.size.width / COL_WIDTH)));
            }
        });

        var colWidth = COL_WIDTHS[$('.container').width()] || COL_WIDTHS[0];

        $(window).resize(function () {
            colWidth = COL_WIDTHS[$('.container').width()] || COL_WIDTHS[0];
            console.log('set colWidth to', colWidth, $('.container').width());
        });
    }

    mapPropertiesFromJson() {
        let settings = this.object._settings || {};
        this["_Columns"] = settings["_Columns"] || 0;
    }

    mapPropertiesToJson(event) {
        let settings = this.object._settings;
        settings["_Columns"] = this["_Columns"];
        this.object._settings = settings;
    }

    generateOutputs(): ColumnOutputs {
        let outputs = {
            onMoving: (event) => {
                console.log(event)
            },
            resizeLeft: (event) => {
                console.log(event);
            },
            resizeRight: (event) => {
                console.log(event);
            },
        }
        return outputs;
    }
}

