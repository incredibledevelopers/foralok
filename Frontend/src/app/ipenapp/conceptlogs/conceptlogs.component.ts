import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConceptlogsService } from '../../services/conceptlogs/conceptlogs.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'conceptlogs',
  templateUrl: './conceptlogs.component.html',
  styleUrls: ['./conceptlogs.component.css'],
  providers: [ConceptlogsService, DatePipe, ToastrService]
})
export class ConceptlogsComponent implements OnInit {

  showLogs: boolean = false;
  loggedUser: string = '';
  sentMessages = [];
  receivedMessages = [];
  comments = [];
  conceptLogsForm: FormGroup;
  conceptid: string = '';
  conceptTitle: string = '';
  @Input("data") data;
  @Output() change = new EventEmitter<string>();

  constructor(private _conceptlogsService: ConceptlogsService, private builder: FormBuilder,
    private datePipe: DatePipe, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loggedUser = sessionStorage.getItem('username');
    this.conceptLogsForm = this.builder.group({
      comments: new FormControl('', Validators.required),
    });
    console.log('Data from concept :', this.data);
    this.openConceptLogs(this.data.id, this.data.conceptTitle);
  }

  openConceptLogs(conceptid, conceptTitle) {
    this.showLogs = true;
    this.conceptid = conceptid;
    this.conceptTitle = conceptTitle;
    this.getConceptByLog(conceptid);
  }

  getConceptByLog(id) {
    this.comments = [];
    this._conceptlogsService.getConceptByLog(id).subscribe(result => {
      if (result) {
        console.log('Logs data', result);
        result.forEach(data => {
          let dt = this.datePipe.transform(data.createdDate, 'dd MMM yy HH:mm a');
          this.comments.push({ enteredBy: data.enteredBy, comments: data.comments, createdDate: dt });
        });
        console.log(this.comments);
      }
    },
      (error) => {
        console.log('Error While Fetching the Concept Logs');
        this.toastr.error('Error While Fetching the Concept Logs', '');
      }
    );
  }

  isNull(input) {
    if (input === undefined || input === null || input === '')
      return true;
    else
      return false;
  }

  postComment() {
    let today = new Date();
    let dateTime = today.toISOString();
    console.log('Posting Comments...');
    let comment = this.conceptLogsForm.get('comments').value;
    let data = {
      comments: comment,
      createdDate: dateTime
    }
    if (this.isNull(comment)) {
      this.toastr.error('Please enter comments');
      return false;
    }
    else {
      this._conceptlogsService.addConceptLog(this.conceptid, this.loggedUser, data).subscribe(result => {
        console.log(result);
        if (result) {
          this.conceptLogsForm.get('comments').setValue('');
          this.openConceptLogs(this.conceptid, this.conceptTitle);
          this.change.emit("yes");
          //this.toastr.success('Logs Added...');
        }
      },
        (error) => {
          console.log('Error While Saving the Concept logs');
          this.toastr.error('Error While Saving the Concept logs');
        }
      )
    }
  }

  gotoBack(){
    this.change.emit("no");
  }

}
