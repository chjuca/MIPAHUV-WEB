import { map } from 'rxjs/operators';
import { Score } from '../models/score.interface';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  scoresCollection: AngularFirestoreCollection;
  scores: Observable<Score[]>;
  scoreDoc: AngularFirestoreDocument;
  collectionNameResources: string;
  collectionNameScores: string;

  constructor(public db: AngularFirestore) {
    this.collectionNameResources = 'resources'
    this.collectionNameScores = "scores";
  }

  getScoresByResource(resourceID: string): Observable<Score[]> {
    this.scoresCollection = this.db.collection(this.collectionNameResources).doc(resourceID).collection(this.collectionNameScores);
    this.scores = this.scoresCollection.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Score
        data.id = a.payload.doc.id;
        return data;
      })
    }))
    return this.scores;
  }
}
