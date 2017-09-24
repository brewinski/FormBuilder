import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
//import { LoginComponent } from './components/login/login.component';
//import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
//import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

//FormComponents
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormRuntimeComponent } from './components/formruntime/formruntime.component';
import { FormControlsComponent } from './components/formcontrols/formcontrols.component';
import { FormRendererComponent } from './components/formrenderer/formrenderer.component';
import { FormComponentRendererComponent } from './components/formcomponentrenderer/formcomponentrenderer.component';
import { FormSettingsComponent } from './components/formsettings/formsettings.component';
import { FormCreateComponent } from './components/formcreate/formcreate.component';
import { FormRulesBuilderComponent } from './components/formrulesbuilder/formrulesbuilder.component';
import { FormToolboxComponent } from './components/formtoolbox/formtoolbox.component';

//FormControls Layout 
import { ControlRowComponent } from './components/controlrow/controlrow.component';
import { ControlColumnComponent } from './components/controlcolumn/controlcolumn.component';

//Form Controls Input
import { ControlHeadingComponent } from './components/controlheading/controlheading.component';
import { ControlTextboxComponent } from './components/controltextbox/controltextbox.component';
import { ControlDropdownComponent } from './components/controldropdown/controldropdown.component';
import { ControlMultiselectComponent } from './components/controlmultiselect/controlmultiselect.component';
import { ControlTextareaComponent } from './components/controltextarea/controltextarea.component';
import { ControlRadiolistComponent } from './components/controlradiolist/controlradiolist.component';
import { ControlButtonComponent } from './components/controlbutton/controlbutton.component';

//Settings 
import { DropdownSettings, TextSettings, TableSettings, ColumnsSettings, TextareaSettings, CheckboxSettings } from './app.model.settings';

//Directives
import { AdDirective } from './directives/invokefunction.directive';

//Services
import { FormManagerService } from './services/formmanager.service'
import { EventsService } from './services/events.service';
import { AuthGuard } from './guards/auth.guard';

import { CanActivateGuard } from './services/can-activate-guard.service';
import { LayoutsAuthComponent } from './components/auth/auth';

//Rules
import { RuleDataTransferComponent } from './components/ruledatatransfer/ruledatatransfer.component';
import { RuleSetVisibilityComponent } from './components/rulesetvisibility/rulesetvisibility.component';
import { RuleWebServiceComponent } from './components/rulewebservice/rulewebservice.component';

// External Modules
import { DragulaModule } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { DynamicModule } from 'ng-dynamic-component';
import { TranslateModule } from '@ngx-translate/core';
import { FormReportComponent } from "./components/formreport/formreport.component";

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        FormBuilderComponent,
        FormRuntimeComponent,
        FormCreateComponent,
        FormRendererComponent,
        FormSettingsComponent,
        FormReportComponent,
        FormControlsComponent,
        FormRulesBuilderComponent,
        ControlRowComponent,
        ControlHeadingComponent,
        ControlColumnComponent,
        ControlTextboxComponent,
        ControlDropdownComponent,
        ControlMultiselectComponent,
        ControlTextareaComponent,
        ControlRadiolistComponent,
        ControlButtonComponent,
        FormComponentRendererComponent,
        AdDirective,
        DropdownSettings,
        TextSettings,
        TableSettings,
        ColumnsSettings,
        TextareaSettings,
        CheckboxSettings,
        RuleDataTransferComponent,
        RuleSetVisibilityComponent,
        RuleWebServiceComponent,
        //      LoginComponent2,
        RegisterComponent,
        LayoutsAuthComponent,
        FormToolboxComponent,
    ],
    imports: [
        DragulaModule,
        DndModule.forRoot(),
        DynamicModule.withComponents([
            ControlRowComponent,
            ControlHeadingComponent,
            ControlColumnComponent,
            ControlTextboxComponent,
            ControlDropdownComponent,
            ControlMultiselectComponent,
            ControlTextareaComponent,
            ControlRadiolistComponent,
            ControlButtonComponent,
            RuleDataTransferComponent,
            RuleSetVisibilityComponent,
            RuleWebServiceComponent,
        ]),
        TranslateModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [CanActivateGuard] },
            //{ path: 'home', component: HomeComponent, canActivate: [CanActivateGuard] },
            {
                canActivate: [CanActivateGuard],
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [CanActivateGuard] },
                    { path: 'create', component: FormCreateComponent, canActivate: [CanActivateGuard] },
                    { path: 'formbuilder/:id', component: FormBuilderComponent, canActivate: [CanActivateGuard],
                        children: [
                            { path: 'tools', component: FormToolboxComponent, canActivate: [CanActivateGuard] },
                            { path: 'rules', component: FormRulesBuilderComponent, canActivate: [CanActivateGuard] },
                            { path: '**', redirectTo: 'tools' }
                        ]
                    },
                    { path: 'report/:id', component: FormReportComponent, canActivate: [CanActivateGuard] },
                ],
                path: '',
                //pathMatch: 'full',
                component: LayoutsAuthComponent
            },
            { path: 'runtime/:id', component: FormRuntimeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', redirectTo: '/' }
        ])
    ],
    providers: [
        FormManagerService,
        EventsService,
        AuthGuard,
        CanActivateGuard
    ],
};
