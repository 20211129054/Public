import { Uye } from './../models/Uye';
import { Anket } from '../models/Anket';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { AnketSoru } from '../models/AnketSoru';
import { AnketSoruSecenek } from '../models/AnketSoruSecenek';
import { AnketSoruCevap } from '../models/AnketSoruCevap';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) { }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  AnketListele() {
    var ref = collection(this.fs, "Anketler");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('UyeId', '==', user?.uid)
        );
        return collectionData(myQuery, { idField: 'AnketId' }) as Observable<Anket[]>;
      })
    );
  }

  TumAnketListele()
  {
    var ref = collection(this.fs, "Anketler");
    return collectionData(ref, { idField: 'AnketId' }) as Observable<Anket[]>;
  }

  AnketGetir(anketId: string) {

    const ref = doc(this.fs, 'Anketler', anketId);
        return docData(ref) as Observable<Anket>;

  }
  SoruGetir(AnketSoruId: string) {

    const ref = doc(this.fs, 'AnketSorular', AnketSoruId);
        return docData(ref) as Observable<AnketSoru>;

  }
  AnketEkle(anket: Anket) {
    var ref = collection(this.fs, "Anketler");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          Ad: anket.Ad,
          OlusturmaTarihi: anket.OlusturmaTarihi,
          DegistirmeTarihi: anket.DegistirmeTarihi,
          UyeId: user?.uid
        })
      ),
      map((ref) => ref.id)
    );
  }
  AnketDuzenle(Anket: Anket) {
    var ref = doc(this.fs, "Anketler/" + Anket.AnketId);
    return updateDoc(ref, { ...Anket });
  }
  AnketSil(Anket: Anket) {
    var ref = doc(this.fs, "Anketler/" + Anket.AnketId);
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
      deleteDoc(ref)
      ),
      map((ref) => ref)
    );
  }

  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {

    var ref = doc(this.fs, "Uyeler", uye.uid);
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
      deleteDoc(ref)
      ),
      map((ref) => ref)
    );
  }


  AnketSoruListele(anketId:string) {
    var ref = collection(this.fs, "AnketSorular");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('AnketId', '==', anketId)
        );
        return collectionData(myQuery, { idField: 'AnketSoruId' }) as Observable<AnketSoru[]>;
      })
    );
  }
  AnketSoruEkle(anketSoru: AnketSoru) {
    var ref = collection(this.fs, "AnketSorular");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          Ad: anketSoru.Ad,
          OlusturmaTarihi: anketSoru.OlusturmaTarihi,
          uid: user?.uid,
          AnketId: anketSoru.AnketId
        })
      ),
      map((ref) => ref.id)
    );
  }
  AnketSoruDuzenle(anketSoru: AnketSoru) {
    var ref = doc(this.fs, "AnketSorular/" + anketSoru.AnketSoruId);
    return updateDoc(ref, { ...anketSoru });
  }
  AnketSoruSil(anketSoru: AnketSoru) {
    var ref = doc(this.fs, "AnketSorular/" + anketSoru.AnketSoruId);
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
      deleteDoc(ref)
      ),
      map((ref) => ref)
    );
  }
  AnketSoruSListele(soruId:string) {
    var ref = collection(this.fs, "AnketSoruSecenek");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('SoruId', '==', soruId)
        );
        return collectionData(myQuery, { idField: 'AnketSoruSId' }) as Observable<AnketSoruSecenek[]>;
      })
    );
  }

  AnketSoruSListe2()
  {
    var ref = collection(this.fs, "AnketSoruSecenek");
    return collectionData(ref, { idField: 'AnketSoruSId' }) as Observable<AnketSoruSecenek[]>;
  }

  AnketSoruSEkle(anketsorusecenek: AnketSoruSecenek) {
    var ref = collection(this.fs, "AnketSoruSecenek");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          Ad: anketsorusecenek.Ad,
          OlusturmaTarihi: anketsorusecenek.OlusturmaTarihi,
          uid: user?.uid,
          SoruId: anketsorusecenek.SoruId
        })
      ),
      map((ref) => ref.id)
    );
  }
  AnketSoruSDuzenle(anketsorusecenek: AnketSoruSecenek) {
    var ref = doc(this.fs, "AnketSoruSecenek/" + anketsorusecenek.AnketSoruSId);
    return updateDoc(ref, { ...anketsorusecenek });
  }
  AnketSoruSSil(anketsorusecenek: AnketSoruSecenek) {
    var ref = doc(this.fs, "AnketSoruSecenek/" + anketsorusecenek.AnketSoruSId);
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
      deleteDoc(ref)
      ),
      map((ref) => ref)
    );
  }


  AnketSoruCevapEkle(anketSoruCevap: AnketSoruCevap) {
    var ref = collection(this.fs, "AnketSoruCevap");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          uid: user?.uid,
          AnketAd: anketSoruCevap.AnketAd,
          AnketId: anketSoruCevap.AnketId,
          AnketSoruAd: anketSoruCevap.AnketSoruAd,
          Cevap: anketSoruCevap.Cevap,
          OlusturmaTarihi: anketSoruCevap.OlusturmaTarihi
        })
      ),
      map((ref) => ref.id)
    );
  }

  AnketSonucListele(anketId:string) {
    var ref = collection(this.fs, "AnketSoruCevap");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('AnketId', '==', anketId)
        );
        return collectionData(myQuery, { idField: 'Id' }) as Observable<AnketSoruCevap[]>;
      })
    );
  }


}
