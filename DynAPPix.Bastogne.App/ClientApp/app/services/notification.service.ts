import { Injectable } from '@angular/core';
//import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastsManager) { }

  public success = (body: string, title = 'Operation successful'): void => {
    this.toastr.success( body, title );
  }

  public error = (body: string, title = 'An error occured'): void => {
      this.toastr.error(body, title);
  }

  public warning = (body: string, title = 'Something went wrong'): void => {
      this.toastr.warning(body, title);
  }
}
