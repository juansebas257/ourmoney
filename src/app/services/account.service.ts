import {
    CollectionReference,
    DocumentData,
    QuerySnapshot,
    addDoc,
    getDocs,
    collection,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    getDoc
} from '@firebase/firestore';
import { Firestore, collectionData, DocumentSnapshot, docData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
    providedIn: 'root',
})

export class AccountService {
    private collectionName: string = 'accounts';
    private collectionRef: CollectionReference<Account> = collection(this.firestore, this.collectionName) as CollectionReference<Account>;

    constructor(private readonly firestore: Firestore) { }

    create(document: Account): Promise<any> {
        return addDoc(this.collectionRef, document);
    }

    delete(id: string): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return deleteDoc(documentReference);
    }

    getAll(): Promise<QuerySnapshot<Account>> {
        const q = query(this.collectionRef);
        return getDocs(q);
    }

    getAllAndSync(): Observable<Account[]> {
        collection(this.firestore, this.collectionName).withConverter
        return collectionData(this.collectionRef, { idField: 'id' });
    }

    get(id: string): Promise<DocumentSnapshot<DocumentData>> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return getDoc(documentReference);
    }

    getAndSync(id: string): Observable<Account> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return docData(documentReference, { idField: 'id' }) as Observable<Account>;
    }

    filter(): Promise<QuerySnapshot<Account>> {
        const q = query(this.collectionRef, where("color", "==", '#ff0000'));
        return getDocs(q);
    }

    update(document: Account): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${document.id}`);
        return updateDoc(documentReference, { ...document });
    }
}