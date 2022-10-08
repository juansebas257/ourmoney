import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

export class TestService {

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<any> {
        return this.httpClient.get('https://reqres.in/api/users?page=2', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        });
    }

}