import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ConceptService } from '../../services/concept/concept.service';
import { LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as tableData from './concept-settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css'],
  providers: [ConceptService, ToastrService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ConceptComponent implements OnInit {
  adminTableData: Array<any>;
  adminSource: LocalDataSource;
  userTableData: Array<any>;
  userSource: LocalDataSource;
  conceptForm: FormGroup;
  conceptEditForm: FormGroup;
  loggedUser: string = '';
  role: string = '';
  showAdminTable: boolean = false;
  showUserTable: boolean = false;
  showLogs: boolean = false;
  settings = tableData.settings;
  @ViewChild("editconceptcontent") editconceptcontent: ElementRef;
  @Output() change = new EventEmitter<Object>();
  conceptData: any;
  subscription: Subscription;

  constructor(private _conceptService: ConceptService, private toastr: ToastrService,
    private modalService: NgbModal, private builder: FormBuilder, private router: Router) {
    this.adminSource = new LocalDataSource(this.adminTableData);
    this.userSource = new LocalDataSource(this.userTableData);
  }

  ngOnInit() {
    
    this.conceptForm = this.builder.group({
      id: new FormControl(''),
      conceptTitle: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      conceptDescription: new FormControl('', Validators.required),
      conceptLeadOrDrop: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.conceptEditForm = this.builder.group({
      id: new FormControl(''),
      conceptTitle: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      conceptDescription: new FormControl('', Validators.required),
      conceptLeadOrDrop: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    let user = sessionStorage.getItem('name');
    console.log('Logged User is:', user);
    this.loggedUser = sessionStorage.getItem('username');
    console.log('loggedUser:', this.loggedUser);
    this.role = sessionStorage.getItem('role');
    console.log('role:', this.role);
    if (this.role === 'ADMIN') {
      this.getAllConcepts();
      this.showAdminTable = true;
    }
    else if (this.role === 'USER') {
      this.getConceptsByUsername(this.loggedUser);
      this.showUserTable = true;
    }
  }

  onEditRowSelect(event) {
    console.log(event);
    this.conceptEditForm.get('id').setValue(event.data.id);
    this.conceptEditForm.get('conceptTitle').setValue(event.data.conceptTitle);
    this.conceptEditForm.get('industry').setValue(event.data.industry);
    this.conceptEditForm.get('conceptDescription').setValue(event.data.conceptDescription);
    this.conceptEditForm.get('conceptLeadOrDrop').setValue(event.data.conceptLeadOrDrop);
    this.conceptEditForm.get('createdDate').setValue(event.data.createdDate);
    if (event.data.status === 'New')
      this.conceptEditForm.get('status').setValue('N');
    else if (event.data.status === 'Pending')
      this.conceptEditForm.get('status').setValue('P');
    else if (event.data.status === 'Closed')
      this.conceptEditForm.get('status').setValue('C');
    this.conceptEditForm.get('lastModifiedDate').setValue(event.data.lastModifiedDate);
    this.editConceptPopup(this.editconceptcontent);
  }

  showConceptLogs(event) {
    if (event.data.status === 'Closed') {
      this.showLogs = false;
      this.toastr.warning('Concept Closed.', 'Alert!');
    }
    else {
      this.showAdminTable = false;
      this.showUserTable = false;
      this.showLogs = true;
      this.conceptData = event.data;
    }
  }

  getAllConcepts() {
    let status = '';
    this.adminTableData = [];
    this._conceptService.getAllConcepts().subscribe(result => {
      result.forEach(data => {
        if (data.status === 'N')
          status = 'New';
        else if (data.status === 'P')
          status = 'Pending';
        else if (data.status === 'C')
          status = 'Closed';
        this.adminTableData.push({
          'id': data.id, 'username': data.username, 'conceptTitle': data.conceptTitle,
          'industry': data.industry, 'conceptDescription': data.conceptDescription, 'conceptLeadOrDrop': data.conceptLeadOrDrop,
          'status': status, 'createdDate': data.createdDate, 'lastModifiedDate': data.lastModifiedDate
        });
      })
      this.adminSource = new LocalDataSource(this.adminTableData);
    },
      (error) => {
        console.log('Error While Fetching the Concepts');
        this.toastr.error('Error While Fetching the Concepts', '');
      }
    );
  }

  getConceptsByUsername(username) {
    let status = '';
    this.userTableData = [];
    this._conceptService.getConceptsByUsername(username).subscribe(result => {
      result.forEach(data => {
        if (data.status === 'N')
          status = 'New';
        else if (data.status === 'P')
          status = 'Pending';
        else if (data.status === 'C')
          status = 'Closed';
        this.userTableData.push({
          'id': data.id, 'username': data.username, 'conceptTitle': data.conceptTitle,
          'industry': data.industry, 'conceptDescription': data.conceptDescription, 'conceptLeadOrDrop': data.conceptLeadOrDrop,
          'status': status, 'createdDate': data.createdDate, 'lastModifiedDate': data.lastModifiedDate
        });
      })
      this.userSource = new LocalDataSource(this.userTableData);
    },
      (error) => {
        console.log('Error While Fetching the Concepts by Username');
        this.toastr.error('Error While Fetching the Concepts by Username', '');
      }
    );
  }

  addConceptPopup(addconceptcontent) {
    this.modalService.open(addconceptcontent, { size: 'lg' });
    this.reset(this.conceptForm);
  }

  editConceptPopup(editconceptcontent) {
    this.modalService.open(editconceptcontent, { size: 'lg' });
  }

  reset(form) {
    form.get('id').setValue('');
    form.get('conceptTitle').setValue('');
    form.get('industry').setValue('');
    form.get('conceptDescription').setValue('');
    form.get('conceptLeadOrDrop').setValue('');
    form.get('createdDate').setValue('');
    form.get('status').setValue('');
    form.get('lastModifiedDate').setValue('');
  }

  saveConcept() {
    let today = new Date();
    let dateTime = today.toISOString();
    let conceptTitle = this.conceptForm.get('conceptTitle').value;
    let industry = this.conceptForm.get('industry').value;
    let conceptDescription = this.conceptForm.get('conceptDescription').value;
    let conceptLeadOrDrop = this.conceptForm.get('conceptLeadOrDrop').value;
    let status = '';
    if (this.isNull(conceptTitle) || this.isNull(industry) || this.isNull(conceptDescription) || this.isNull(conceptLeadOrDrop)) {
      this.toastr.error('Please fill all the fields', '');
      return false;
    }
    else {
      console.log(conceptTitle, industry, conceptDescription, conceptLeadOrDrop);
      let concept = {
        "username": this.loggedUser,
        "conceptTitle": conceptTitle,
        "industry": industry,
        "conceptDescription": conceptDescription,
        "conceptLeadOrDrop": conceptLeadOrDrop,
        "status": status,
        "createdDate": dateTime,
        "lastModifiedDate": dateTime
      }
      this._conceptService.saveConcept(concept).subscribe(result => {
        console.log(result);
        if (result) {
          this.modalService.dismissAll();
          this.toastr.success('Concept Saved Successfully...', '');
          if (this.role === 'ADMIN')
            this.getAllConcepts();
          else if (this.role === 'USER')
            this.getConceptsByUsername(this.loggedUser);
          this.router.navigate(['ipenapp/concept']);
        }
      },
        (error) => {
          console.log('Error While Saving the Concept');
          this.toastr.error('Error While Saving the Concept', '');
          this.router.navigate(['ipenapp/concept']);
        }
      )
    }
  }

  updateConcept() {
    let today = new Date();
    let dateTime = today.toISOString();
    let id = this.conceptEditForm.get('id').value;
    let conceptTitle = this.conceptEditForm.get('conceptTitle').value;
    let industry = this.conceptEditForm.get('industry').value;
    let conceptDescription = this.conceptEditForm.get('conceptDescription').value;
    let conceptLeadOrDrop = this.conceptEditForm.get('conceptLeadOrDrop').value;
    let createdDate = this.conceptEditForm.get('createdDate').value;
    let status = this.conceptEditForm.get('status').value;
    if (this.isNull(conceptTitle) || this.isNull(industry) || this.isNull(conceptDescription) || this.isNull(conceptLeadOrDrop)) {
      this.toastr.error('Please fill all the fields', '');
      return false;
    }
    else {
      console.log(id, conceptTitle, industry, conceptDescription, conceptLeadOrDrop);
      let concept = {
        "username": this.loggedUser,
        "conceptTitle": conceptTitle,
        "industry": industry,
        "conceptDescription": conceptDescription,
        "conceptLeadOrDrop": conceptLeadOrDrop,
        "status": status,
        "createdDate": createdDate,
        "lastModifiedDate": dateTime
      }
      this._conceptService.updateConcept(id, concept).subscribe(result => {
        console.log(result);
        if (result) {
          this.modalService.dismissAll();
          this.toastr.success('Concept Updated Successfully...');
          this.router.navigate(['ipenapp/concept']);
          if (this.role === 'ADMIN')
            this.getAllConcepts();
          else if (this.role === 'USER')
            this.getConceptsByUsername(this.loggedUser);
        }
      },
        (error) => {
          console.log('Error While Updating the Concept');
          this.toastr.error('Error While Updating the Concept', '');
        }
      )
    }
  }

  isNull(input) {
    if (input === undefined || input === null || input === '')
      return true;
    else
      return false;
  }

  onSearch(userType, query: string = '') {
    if (query === '') {
      this.adminSource.setFilter([]);
      this.userSource.setFilter([]);
    } else {
      if (userType === 'ADMIN') {
        this.adminSource.setFilter([
          {
            field: 'conceptTitle',
            search: query
          },
          {
            field: 'industry',
            search: query
          },
          {
            field: 'conceptDescription',
            search: query
          },
          {
            field: 'conceptLeadOrDrop',
            search: query
          },
          {
            field: 'status',
            search: query
          }
        ], false);
      }
      else if (userType === 'USER') {
        this.userSource.setFilter([
          {
            field: 'conceptTitle',
            search: query
          },
          {
            field: 'industry',
            search: query
          },
          {
            field: 'conceptDescription',
            search: query
          },
          {
            field: 'conceptLeadOrDrop',
            search: query
          },
          {
            field: 'status',
            search: query
          }
        ], false);
      }
    }
  }

  showLogsChange($value) {
    console.log('data from logs comp :', $value);
    if ($value === 'yes') {
      this.showLogs = true;
      this.showAdminTable = false;
      this.showUserTable = false;
    }
    else if ($value === 'no') {
      this.showLogs = false;
      if (this.role === 'ADMIN')
        this.showAdminTable = true;
      else if (this.role === 'USER')
        this.showUserTable = true;
    }
  }

}
