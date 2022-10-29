import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApplicationService {
    navBarTitle = new BehaviorSubject('');
    backArrowRoute = new BehaviorSubject('');
    selectedMenu = new BehaviorSubject('');
    toastMessage = new BehaviorSubject('');
    toastWarning = new BehaviorSubject('');
    toastDanger = new BehaviorSubject('');
    messageDialog = new BehaviorSubject('');


    setNavBar(name: string) {
        this.navBarTitle.next(name);
    }

    setBackArrowRoute(name: string) {
        this.backArrowRoute.next(name);
    }

    setSelectedMenu(item: string) {
        this.selectedMenu.next(item);
    }

    showToast(text: string) {
        this.toastMessage.next(text);
    }

    showToastWarning(text: string) {
        this.toastWarning.next(text);
    }

    showToastDanger(text: string) {
        this.toastDanger.next(text);
    }

    showMessageDialog(text: string) {
        this.messageDialog.next(text);
    }
}
