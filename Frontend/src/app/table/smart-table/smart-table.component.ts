import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConceptService } from '../../services/concept/concept.service';
import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from './smart-data-table';

@Component({
  templateUrl: './smart-table.component.html',
  providers: [ConceptService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SmarttableComponent {
  adminTableData: Array<any>;
  source: LocalDataSource;
  source2: LocalDataSource;

  settings = {
    columns: {
      conceptTitle: {
        title: 'Concept Name'
      },
      industry: {
        title: 'Industry'
      },
      conceptDescription: {
        title: 'Description'
      },
      conceptLeadOrDrop: {
        title: 'Launch Type'
      },
      status: {
        title: 'Status'
      }
    },
  
    edit: {
      editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>'
    }
  };

  settings2 = tableData.settings2;

  constructor(private _conceptService: ConceptService) {
    this.getAllConcepts();
    this.source = new LocalDataSource(tableData.data); // create the source
  }

  ngOnInit(){
  }

  getAllConcepts() {
    let status = '';
    this.adminTableData = [];
    this._conceptService.getAllConcepts().subscribe(result => {
      result.forEach(data => {
        if(data.status === 'N')
            status =  'New';
        else if(data.status === 'P')
            status =  'Pending';
        else if(data.status === 'C')
            status =  'Closed';    
        this.adminTableData.push({
          'conceptTitle': data.conceptTitle,
          'industry': data.industry, 'conceptDescription': data.conceptDescription, 'conceptLeadOrDrop': data.conceptLeadOrDrop,
          'status': status
        });
      })
      this.source = new LocalDataSource(this.adminTableData);
    },
      (error) => {
        console.log('Error While Fetching the Concepts');
        //this.messageService.add({ severity: 'error', summary: '', detail: 'Error While Fetching the Concepts' });
        //this.router.navigate(['pages/ipenapp/concept']);
      }
    );
   
  }

  
  
}
