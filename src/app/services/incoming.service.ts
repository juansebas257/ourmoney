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
import { Incoming } from '../models/incoming.model';

@Injectable({
    providedIn: 'root',
})

export class IncomingService {
    private collectionName: string = 'incomings';
    private collectionRef: CollectionReference<Incoming> = collection(this.firestore, this.collectionName) as CollectionReference<Incoming>;

    constructor(private readonly firestore: Firestore) { }

    create(document: Incoming): Promise<any> {
        return addDoc(this.collectionRef, document);
    }

    delete(id: string): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return deleteDoc(documentReference);
    }

    getAll(): Promise<QuerySnapshot<Incoming>> {
        const q = query(this.collectionRef);
        return getDocs(q);
    }

    getAllAndSync(): Observable<Incoming[]> {
        collection(this.firestore, this.collectionName).withConverter
        return collectionData(this.collectionRef, { idField: 'id' });
    }

    get(id: string): Promise<DocumentSnapshot<DocumentData>> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return getDoc(documentReference);
    }

    getAndSync(id: string): Observable<Incoming> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${id}`);
        return docData(documentReference, { idField: 'id' }) as Observable<Incoming>;
    }

    filter(): Promise<QuerySnapshot<Incoming>> {
        const q = query(this.collectionRef, where("color", "==", '#ff0000'));
        return getDocs(q);
    }

    update(document: Incoming): Promise<void> {
        const documentReference = doc(this.firestore, `${this.collectionName}/${document.id}`);
        return updateDoc(documentReference, { ...document });
    }
}