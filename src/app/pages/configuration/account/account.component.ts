import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";



@Component({
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})

export class AccountComponent implements OnInit {
    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
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
        this.accountService.delete('9GbHxIJbZzsT70JGT2A2').then(result => {
            console.log('DELETED result', result);
        }).catch(error => {
            console.log('error', error)
        })


    }
}