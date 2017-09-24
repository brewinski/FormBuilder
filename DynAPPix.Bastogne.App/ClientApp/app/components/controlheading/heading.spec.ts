import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlHeadingComponent } from './controlheading.component';
import { EventsService } from "../../services/events.service";

describe('AppComponent (inline template)', () => {

    let comp: ControlHeadingComponent;
    let fixture: ComponentFixture<ControlHeadingComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ControlHeadingComponent], // declare the test component
            providers: [
                EventsService
            ],
        });

        fixture = TestBed.createComponent(ControlHeadingComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        //de = fixture.debugElement.query(By.css('h1'));
        //el = de.nativeElement;
    });

    it('should display original title', () => {
        comp._ControlName.value = "Texting Name"
        fixture.detectChanges();
        expect("Texting Name").toContain(comp._ControlName.value); 
    });

    //it('should display a different test title', () => {
    //    comp.title = 'Test Title';
    //    fixture.detectChanges();
    //    expect(el.textContent).toContain('Test Title');
    //});

});