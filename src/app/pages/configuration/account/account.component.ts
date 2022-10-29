import { identifierName } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { QuerySnapshot } from "@angular/fire/firestore";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";
import { ApplicationService } from "src/app/services/application.service";
import { ErrorUtils } from "src/app/utils/error.utils";



@Component({
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})

export class AccountComponent implements OnInit {

    accounts: Account[] = [];

    constructor(private accountService: AccountService, private _appService: ApplicationService) {
        this._appService.setBackArrowRoute('');
        this._appService.setNavBar('Cuentas');
    }

    ngOnInit(): void {
        this._getAll();
        /*
        //CReATE
        const myAccount: Account = {
            name: "kathe's accopsssunt",
            color: '#ffff00'
        }
        this.accountService.create(myAccount).then(result => {
            console.log('result', result.id);
        }).catch(error => {
            console.log('error', error)
        })*/

        /*
        //get all
                this.accountService.getAll().subscribe(
                    result => {
                        console.log('result', result);
                    },
                    error => {
                        console.log('error', error)
                    });}*/


        /* 
//get one
this.accountService.get('9GbHxIJbZzsT70JGT2A2').subscribe(
 result => {
     console.log('result', result);
 },
 error => {
     console.log('error', error)
 });
 */

        /*
        //UPDATE
    this.accountService.get('9GbHxIJbZzsT70JGT2A2').subscribe(
        result => {
            console.log('result', result);
            result.name = 'patata',
            this.accountService.update(result).then(result => {
                console.log('result', result);
            }).catch(error => {
                console.log('error', error)
            })
        },
        error => {
            console.log('error', error)
        });
        */



        //delete

        /*this.accountService.delete('9GbHxIJbZzsT70JGT2A2').then(result => {
            console.log('DELETED result', result);
        }).catch(error => {
            console.log('error', error)
        })
        */

    }

    private _getAll(): void {
        this.accountService.getAll()
            .then((result: QuerySnapshot<Account>) => this.accounts = result.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }))
            .catch(error => ErrorUtils.handleError(error));
    }
}