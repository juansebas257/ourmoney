import { Component } from "@angular/core";
import { ApplicationService } from "src/app/services/application.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent {

    buttonsDisplayed: boolean = false;

    constructor(private _appService: ApplicationService) {
        this._appService.setBackArrowRoute('');
        _appService.setNavBar('Inicio');
    }
}