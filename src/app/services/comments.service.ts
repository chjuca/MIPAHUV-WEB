import { map } from 'rxjs/operators';
import { Comment } from './../models/comment.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsCollection: AngularFirestoreCollection;
  comments: Observable<Comment[]>;
  commentDoc: AngularFirestoreDocument;
  collectionNameResources: string;
  collectionNameComments: string;


  constructor(public db: AngularFirestore) {
    this.collectionNameResources = 'resources'
    this.collectionNameComments = "comments";
  }

  getCommentsByResource(resourceID: string): Observable<Comment[]> {
    this.commentsCollection = this.db.collection(this.collectionNameResources).doc(resourceID).collection(this.collectionNameComments);
    this.comments = this.commentsCollection.snapshotChanges().pipe(map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Comment
        data.id = a.payload.doc.id;
        return data;
      })
    }))
    return this.comments;
  }
}
