import {
    CollectionReference,
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
    providedIn: 'root',
})

export class AccountService {
    private collectionName: string = 'accounts';
    private collection: CollectionReference<Account> = collection(this.firestore, this.collectionName) as CollectionReference<Account>;

    constructor(private readonly firestore: Firestore) { }

    getAll(): Observable<Account[]> {
        return collectionData(this.collection, { idField: 'id' });
    }

    get(id: string): Observable<Account> {

        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return docData(documentReference, { idField: 'id' }) as Observable<Account>;
    }

    create(document: Account): Promise<any> {
        return addDoc(this.collection, document);
    }

    update(document: Account): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${document.id}`);
        return updateDoc(documentReference, { ...document });
    }

    delete(id: string): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return deleteDoc(documentReference);
    }
}