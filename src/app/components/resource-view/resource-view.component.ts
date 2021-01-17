import { Resource } from './../../models/resources.interface';
import { ScoreService } from './../../services/score.service';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentsService } from './../../services/comments.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  @ViewChild('resourcesView', { static: false }) resourceViewModal: ModalDirective;

  subscription: Subscription;
  comments = [];
  scores = [];
  resource = {} as Resource;
  average: number;
  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;

  constructor(private modalService: BsModalService, public commentsService: CommentsService, public scoreService: ScoreService, public modalRef: BsModalRef) { }

  ngOnInit() {
    this.subscription = this.commentsService.getCommentsByResource(this.resource.id).subscribe(comments => {
      this.comments = comments
    });
    this.scoreService.getScoresByResource(this.resource.id).subscribe(scores => {
      this.scores = scores;
      let sum = 0;
      this.scores.forEach(score => {
        sum += score.score;
      })
      this.average = sum / this.scores.length || 0;
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

}
