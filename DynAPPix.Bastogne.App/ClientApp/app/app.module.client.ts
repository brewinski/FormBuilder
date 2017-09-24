import "bootstrap/dist/js/bootstrap.js"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { NAV_DROPDOWN_DIRECTIVES } from './directives/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './directives/sidebar.directive';
import '@dynappix/dyn-admin-lte/app.js';

import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';
import { FormBuilderHeaderComponent } from './widgets/formbuilder-header';

let widgets = [
    BreadcrumbComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent,
    FormBuilderHeaderComponent
];

import { UserService } from './services/user.service';
import { MenuService } from './services/menu.service';
import { MessagesService } from './services/messages.service';
import { CanActivateGuard } from './services/can-activate-guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { TranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';

let services = [
    UserService,
    MenuService,
    BreadcrumbService,
    MessagesService,
    CanActivateGuard,
    NotificationService,
    TranslateService,
    LoggerService
];


export class CustomToastOptions extends ToastOptions {
    //animate = 'flyRight';
    positionClass = 'toast-bottom-right';
    showCloseButton = true;
    enableHTML: true;
}

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [
        sharedConfig.declarations,
        NAV_DROPDOWN_DIRECTIVES,
        SIDEBAR_TOGGLE_DIRECTIVES,
        ...widgets
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ToastModule.forRoot(),
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: ToastOptions, useClass: CustomToastOptions },
        AuthenticationService,
        AuthGuard,
        ...services
    ]
})
export class AppModule {
}
