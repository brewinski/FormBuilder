// ------------ TODO: Teach these classes to create themselves with the component factory. ---------------------------------- //
// ------------ TODO: move these components into seperate files. --------------------//


// These classes are dynamicly created and rendered using the component factory.
// All settings have a component and a class. 
// Create a new class and specify the component as a property of the class. This property tells the component factory how to render it.

// --------------------------------------------------------------------------------

import { Component, Input, Type, ViewChild, ElementRef } from '@angular/core';
import { Control } from "./app.model";
import * as $ from 'jquery';
var RangeBar = require('elessar');


// --------------------------------------------------------------------------------
// Interfaces make sure that all settings classes have the same properties for the settings component to render them.
// --------------------------------------------------------------------------------

export interface ISettings {
    implementor: IConstructor;
    construct(Constructor: IConstructor): void;
}

export interface IConstructor {
    component: Type<ISettings>;
    displayName: string;
    settingsType: string;
    value: any;
    onChange: () => any;
    pushValue(value: any): any;
    group: string;
}

// --------------------------------------------------------------------------------
//Dropdown Settings Classes. 
//
// Use these classes to create a dropdown of options for the settings panel.
// Construct an Array of predefined Option objects when you create the object.
// Object.key and Object.value
// Output: string - selected object value
// --------------------------------------------------------------------------------
export class DropdownConstructor implements IConstructor {
    component: Type<ISettings> = DropdownSettings;
    displayName: string;
    settingsType: string = "DropdownSettings";
    value: any = "";
    options: Array<Option>;
    onChange: () => any;
    group: string = "General";

    constructor(displayName: string, options: Array<Option>, onChange: () => any, group: string) {
        this.displayName = displayName;
        this.options = options;
        this.onChange = onChange;
        this.group = group;
    }
    pushValue(value: any) {
        this.value = value;
        this.onChange();
    }
}

@Component({
    selector: 'setting-dropdown',
    template: `
        <div class="form-group">
            <label for="prop" class="col-xs-3">{{implementor.displayName}}</label>
            <div class="col-xs-9">
                <select class="form-control" [(ngModel)]="implementor.value" (ngModelChange)="implementor.onChange()">
                    <option *ngFor="let option of implementor.options"
                            [ngValue]="option.value">
                        {{option.name}}
                    </option>
                </select>
            </div>
        </div>
`,
})
export class DropdownSettings implements ISettings {
    implementor: DropdownConstructor;

    construct(DropdownConstructor: DropdownConstructor): void {
        this.implementor = DropdownConstructor;
    }

    setValue(name, value) {
        this.implementor.value = new Option(name, value);
    }

    setValueWithOption(option: Option) {
        this.implementor.value = option;
    }

    getValue() {
        return this.implementor.value;
    }

    addOption(name, value) {
        this.implementor.options.push(new Option(name, value));
    }

    addOptionWithOption(option: Option) {
        this.implementor.options.push(option);
    }

    getOptions(): Array<Option> {
        return this.implementor.options;
    }

    removeOption(option: Option) {
        this.implementor.options.splice(this.implementor.options.indexOf(option), 1);
    }
}

// --------------------------------------------------------------------------------
// Textbox Settings Classes. 
//
// Use these classes to create a textbox the options settings panel.
// 
// Output: string - Input into rendered textbox
// --------------------------------------------------------------------------------

export class TextboxConstructor implements IConstructor {
    component: Type<ISettings> = TextSettings;
    displayName: string;
    dataType: string;
    settingsType: string = "TextSettings";
    value: any;
    options: Array<Option>;
    onChange: () => any;
    group: string = "General";

    constructor(displayName: string, onChange: () => any, dataType: string, group: string, defaultValue?: string) {
        this.displayName = displayName;
        this.onChange = onChange;
        this.dataType = dataType;
        this.value = defaultValue;
        this.group = group;
    }
    pushValue(value: any) {
        this.value = value;
        this.onChange();
    }
}

@Component({
    selector: 'settings-textbox',
    template: `
        <div class="form-group ">
            <label for="prop" class="col-xs-3">{{implementor.displayName}}</label>
            <div class="col-xs-9">
                <input type="text"
                        class="form-control"
                        placeholder="Enter text here"
                        [(ngModel)]="implementor.value"
                        (ngModelChange)="implementor.onChange()">
            </div>
        </div>
`,
})
export class TextSettings implements ISettings {
    public implementor: TextboxConstructor;

    construct(TextboxConstructor: TextboxConstructor): void {
        this.implementor = TextboxConstructor;
    }
}

// --------------------------------------------------------------------------------
//Table Settings Classes.
//
// Use thesee classes to create tables of data and specify a custom structure e.g. {name: "Name", number: "Number", value: "Value"} will result in:
//      Name    Number      Value       Remove
// ---------------------------------------------
//      Input |  Input    |   Input         x
//
//  add
//
// The return value will be an array of the structure object you passed in.
// {name: "Name", number: "Number", value: "Value"}
// Output:
//          [
//              { name: "Chris", number: "20", value: "example-1" },
//              { name: "Brendon", number: "15", value: "example-2" },
//              { name: "Clayton", number: "44", value: "example-3" },
//          ]
// --------------------------------------------------------------------------------


export class TableConstructor implements IConstructor {
    component: Type<ISettings> = TableSettings;
    public displayName: string;
    public dataType: string;
    public readonly settingsType: string = "ListSettings";
    public onChange: () => any;
    public value: Array<any> = new Array<any>();

    public structure: any;
    public structureProperties: Array<string>;
    public structureCopy: any = {};
    public group: string = "General";

    constructor(displayName: string, onChange: () => any, value: Array<any>, structure: any, group: string) {
        this.displayName = displayName;
        this.onChange = onChange;
        this.value = value || new Array<any>();
        this.structure = structure;
        this.group = group;
    }
    pushValue(value: any) {
        this.value = value;
        this.onChange();
    }
}

@Component({
    selector: 'settings-table',
    template: `
        <div class="form-group">
            <div class="col-xs-12">
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th *ngFor="let stprop of implementor.structureProperties">{{implementor.structure[stprop]}}</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let v of implementor.value; index as i;">
                            <td >{{i + 1}}</td>
                            <td *ngFor="let stprop of implementor.structureProperties">
                                <input type="text"
                                        class="form-control"
                                        placeholder="Enter text here"
                                        [(ngModel)]="v[stprop]"
                                        (blur)="implementor.onChange()" />
                            </td>
                            <td><button (click)="remove(v)">X</button></td>
                        </tr>
                    </tbody>
                </table>
                <button (click)="add()">add</button>
            </div>
        </div>

`,
})
export class TableSettings implements ISettings {
    implementor: TableConstructor;

    construct(TableConstructor: TableConstructor): void {
        this.implementor = TableConstructor;

        this.reflectNewObjectProperties();
    }
    

    add() {
        this.implementor.value.push(Object.assign({}, this.implementor.structureCopy));
    }

    remove(structure: any) {
        this.implementor.value.splice(this.implementor.value.indexOf(structure), 1);
    }

    reflectNewObjectProperties() {
        this.implementor.structureProperties = new Array<string>();
        for (var key in this.implementor.structure) {
            if (this.implementor.structure.hasOwnProperty(key) && typeof this.implementor.structure[key] !== 'function') {
                this.implementor.structureProperties.push(key);
                this.implementor.structureCopy[key] = "";
            }
        }
        console.log(this.implementor.structureProperties);
    }
}

// --------------------------------------------------------------------------------
// Textarea Classes
//
// Use this class to add multiline text settings option
// Works like the textbox.
// Output: String
// --------------------------------------------------------------------------------

export class TextareaConstructor implements IConstructor {
    component: Type<ISettings> = TextareaSettings;
    displayName: string;
    settingsType: string = "TextAreaSettings";
    value: any = null;
    onChange: () => any;
    group: string = "General";

    constructor(displayName: string, onChange: () => any, group: string) {
        this.displayName = displayName;
        this.onChange = onChange;
        this.group = group;
    }

    pushValue(value: any) {
        throw new Error('Method not implemented.');
    }


}

@Component({
    selector: "settings-textarea",
    template: `
        <div class="form-group">
            <label for="prop" class="col-xs-3">{{implementor.displayName}}</label>
            <div class="col-xs-9">
                <textarea type="text"
                        rows="5"
                        class="form-control"
                        placeholder="Enter text here"
                        [(ngModel)]="implementor.value"
                        (ngModelChange)="implementor.onChange()">
                </textarea>
            </div>
        </div>
    `
})
export class TextareaSettings implements ISettings {
    implementor: TextareaConstructor;
    construct(TextareaConstructor: TextareaConstructor): void {
        this.implementor = TextareaConstructor;
    }
}

// --------------------------------------------------------------------------------
// Checkbox Classes
//
// Use this class to add multiline text settings option
// Works like the textbox.
// Output: String
// --------------------------------------------------------------------------------

export class CheckboxConstructor implements IConstructor {
    component: Type<ISettings> = CheckboxSettings;
    displayName: string;
    settingsType: string;
    value: any = null;
    onChange: () => any;
    group: string = "General";

    constructor(displayName: string, onChange: () => any, group: string) {
        this.displayName = displayName;
        this.onChange = onChange;
        this.group = group;
    }

    pushValue(value: any) {
        throw new Error('Method not implemented.');
    }
}

@Component({
    selector: "settings-checkbox",
    template: `
        <div class="form-group">
            <label class="col-xs-3">{{implementor.displayName}}</label>
            <div class="col-xs-9">
                <input type="checkbox" value="" (click)="click()" [(ngModel)]="implementor.value" [checked]="true" (change)="implementor.onChange()" />
            </div>
        </div>
    `
})
export class CheckboxSettings implements ISettings {
    implementor: CheckboxConstructor;

    construct(Constructor: CheckboxConstructor): void {
        this.implementor = Constructor;
    }

    click() {
        console.log("Click!");
    }
}

// --------------------------------------------------------------------------------
// Column Classes
//
// Use this class to add a list of columns to a row control. 
// This settings object could be adapted create lists of any object with generics.
// --------------------------------------------------------------------------------

export class ColumnConstructor implements IConstructor {

    component: Type<ISettings> = ColumnsSettings;
    displayName: string;
    settingsType: string;
    value: any;
    onChange: () => any;

    objects: Array<Control>;
    group: string = "General";

    constructor(displayName: string, onChange: () => any, objects: Array<Control>, group: string) {
        this.displayName = displayName;
        this.onChange = onChange;
        this.objects = objects;
        this.group = group;
    }
    pushValue(value: any) {
        this.value = value;
        this.onChange();
    }
}

@Component({
    selector: "settings-columns",
    template: `
        <div class="form-group c">
            <label for="prop">{{implementor.displayName}}</label>
            <div *ngFor="let object of implementor.objects">
                <label>Item</label>
                <a (click)="remove(object)">Remove</a>
            </div>
            <a (click)="add()">Add</a>
            <div #rangeBar ></div>
        </div>
    `
})
export class ColumnsSettings implements ISettings {
    implementor: ColumnConstructor;
    settingsType: string = "ColumnSettings";

    @ViewChild('rangeBar') barRef: ElementRef;

    bar = new RangeBar({
        min: 0, // value at start of bar
        max: 12, // value at end of bar
        minSize: 1, // smallest allowed range (in bar units)
        maxRanges: 12,
        snap: 1,
        allowDelete: true, // set to true to enable double-middle-click-to-delete
        allowSwap: true, // swap ranges when dragging past
    });

    construct(ColumnConstructor: ColumnConstructor): void {
        this.implementor = ColumnConstructor;
        this.buildRanges();
    }

    buildRanges() {
        let range: Array<Array<number>> = new Array<Array<number>>();
        let index: number = 0;

        for (let col of this.implementor.objects) {
            let vals = new Array<number>();
            let oldStart: number = 0;
            let oldEnd: number = 0;

            if (index > 0) {
                oldStart = range[index - 1][0];
                oldEnd = range[index - 1][1];
            }
            if (!col._settings["_ColumnOffset"]) {
                let settings = col._settings;
                settings["_ColumnOffset"] = "col-sm-offset-0";
                col._settings = settings;
            }
            if (!col._settings["_Column Width"]) {
                let settings = col._settings;
                settings["_Column Width"] = "col-sm-1";
                col._settings = settings;
            }
            let start: number = col._settings["_ColumnOffset"].replace(/\D/g, '');
            let end: number = col._settings["_Column Width"].replace(/\D/g, '');

            let rangeStart: number = +start + +oldEnd;
            let rangeEnd: number = +end + +rangeStart;

            vals.push(rangeStart);
            vals.push(rangeEnd);
            range.push(vals);

            index++;
        }

        this.bar.val(range);
    }

    ngAfterViewInit() {
        $(this.barRef.nativeElement).append(this.bar.$el);
        //this.barRef.nativeElement = this.bar.$el[0];
    }

    ngOnInit() {
        this.bar.on('change', (values, range) => {
            let ranges: Array<Array<number>> = range;
            let index: number = 0;

            if (ranges.length > this.implementor.objects.length) {

            }

            for (let vals of ranges) {
                let start: number = vals[0];
                let end: number = vals[1];

                let currentCol = this.implementor.objects[index];

                let oldStart: number = 0;
                let oldEnd: number = 0;

                if (index > 0) {
                    oldStart = range[index - 1][0];
                    oldEnd = range[index - 1][1];
                }

                let offset: number = start - oldEnd;
                let width: number = end - start;

                let settings = currentCol._settings

                settings["_ColumnOffset"] = "col-sm-offset-" + Math.round(offset);
                settings["_Column Width"] = "col-sm-" + Math.round(width);

                currentCol._settings = settings;

                index++;
            }

        });
    }

    add() {
        this.implementor.objects.push(new Control("ControlColumnComponent"));
        this.buildRanges();
    }



    remove(Control: Control) {
        let index = this.implementor.objects.indexOf(Control);
        if (index !== -1) {
            this.implementor.objects.splice(index, 1);
        }
        this.buildRanges();
    }
}



//Helper Classes

export class Option {
    public name: string;
    public value: string;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export class InputDataTypes {
    static Text = "text";
    static Password = "password";
    static Number = "number";
    static DateTime = "datetime-local";
    static Date = "date";
    static Month = "month";
    static Week = "week";
    static Color = "color";
    static File = "file";
}