import { Component } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { ApplicationService } from './services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Inicio';
  backArrowRoute: string = '';
  mobileQuery: MediaQueryList;
  mobileSize: number = 600;
  showNavBar: boolean;
  selectedMenu: string = '';
  toastConfiguration: Object = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  }

  constructor(media: MediaMatcher, private applicationService: ApplicationService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

    this.showNavBar = window.innerWidth > this.mobileSize;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.showNavBar = window.innerWidth > this.mobileSize;
    };

    // Subscribed Behaviors
    this.applicationService.navBarTitle.subscribe((updatedTitle) => {
      this.title = updatedTitle;
    });

    this.applicationService.backArrowRoute.subscribe((newTest: string) => {
      this.backArrowRoute = newTest;
    });

    this.applicationService.navBarTitle.subscribe((updatedTitle) => {
      this.title = updatedTitle;
    });

    this.applicationService.toastMessage.subscribe((message) => {
      if (message != '') {
        this._snackBar.open(message, undefined, {
          ...this.toastConfiguration,
          panelClass: ['snackbar-green'],
        });
      }
    });

    this.applicationService.toastWarning.subscribe((message) => {
      if (message != '') {
        this._snackBar.open(message, undefined, {
          ...this.toastConfiguration,
          panelClass: ['snackbar-yellow'],
        });
      }
    });

    this.applicationService.toastDanger.subscribe((message) => {
      if (message != '') {
        this._snackBar.open(message, undefined, {
          ...this.toastConfiguration,
          panelClass: ['snackbar-red'],
        });
      }
    });

    this.applicationService.messageDialog.subscribe((message) => {
      if (message != '') {
        this.showMessageDialog(message);
      }
    });
    // End Subscribed Behaviors
  }

  showMessageDialog(message: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message,
    };

    this.dialog.open(MessageDialogComponent, dialogConfig);
  }

  logout(): void {

  }
}
