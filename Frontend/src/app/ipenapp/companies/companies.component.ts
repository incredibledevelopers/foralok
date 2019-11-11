import { CompaniesService } from '../../services/companies/companies.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as tableData from './company-settings';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import * as empTableData from './employee-settings';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompaniesService, ToastrService]
})
export class CompaniesComponent implements OnInit {

  loggedUser: string = '';
  companyTableData: Array<any>;
  companyForm: FormGroup;
  companyEditForm: FormGroup;
  employeeForm: FormGroup;
  employeeEditForm: FormGroup;
  employeeTableData: Array<any>;
  showEmployees: boolean = false;
  noRecordsFound: string = '';
  settings = tableData.settings;
  empSettings = empTableData.empSettings;
  companySource: LocalDataSource;
  employeeSource: LocalDataSource;
  @ViewChild("editcompany") editcompanycontent: ElementRef;
  @ViewChild("editemployee") editemployeecontent: ElementRef;
  cmpName: string = '';

  constructor(private _companiesService: CompaniesService, private builder: FormBuilder,
    private toastr: ToastrService, private modalService: NgbModal) {
    this.companySource = new LocalDataSource(this.companyTableData);
    this.employeeSource = new LocalDataSource(this.employeeTableData);
  }

  ngOnInit() {

    this.companyForm = this.builder.group({
      id: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      openingStock: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      taxYear: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required)
    });

    this.companyEditForm = this.builder.group({
      id: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      openingStock: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      taxYear: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required)
    });

    this.employeeForm = this.builder.group({
      companyId: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      profileId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      stockUnits: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required)
    });

    this.employeeEditForm = this.builder.group({
      companyId: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      profileId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      stockUnits: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required),
      lastModifiedDate: new FormControl('', Validators.required),
    });
    this.getAllCompanies();
  }

  getAllCompanies() {
    let status = '';
    this.companyTableData = [];
    this._companiesService.getAllCompanies().subscribe(result => {
      result.forEach(data => {
        if (data.status === 'N')
          status = 'New';
        else if (data.status === 'P')
          status = 'Pending';
        else if (data.status === 'C')
          status = 'Closed';
        this.companyTableData.push({
          'id': data.id, 'companyName': data.companyName, 'description': data.description,
          'industry': data.industry, 'location': data.location, 'address': data.address,
          'openingStock': data.openingStock, 'status': status, 'taxYear': data.taxYear
        });
      })
      this.companySource = new LocalDataSource(this.companyTableData);
    },
      (error) => {
        this.toastr.error('Error While Fetching company details');
        console.log('Error While Fetching the Company');
      }
    );
  }

  onSearch(query: string = '') {
    this.companySource.setFilter([
      {
        field: 'companyName',
        search: query
      },
      {
        field: 'industry',
        search: query
      },
      {
        field: 'description',
        search: query
      },
      {
        field: 'address',
        search: query
      },
      {
        field: 'location',
        search: query
      },
      {
        field: 'openingStock',
        search: query
      },
      {
        field: 'taxYear',
        search: query
      },
      {
        field: 'status',
        search: query
      }
    ], false);
  }

  onEmployeeSearch(query: string = '') {
    this.employeeSource.setFilter([
      {
        field: 'username',
        search: query
      },
      {
        field: 'profileId',
        search: query
      },
      {
        field: 'designation',
        search: query
      },
      {
        field: 'department',
        search: query
      },
      {
        field: 'salary',
        search: query
      },
      {
        field: 'remarks',
        search: query
      },
      {
        field: 'stockUnits',
        search: query
      },
      {
        field: 'status',
        search: query
      }
    ], false);
  }

  addCompanyPopup(addcompanycontent) {
    this.resetCompanyForm(this.companyForm);
    this.modalService.open(addcompanycontent, { size: 'lg' });
  }

  editCompanyPopup(editcompanycontent) {
    this.modalService.open(editcompanycontent, { size: 'lg' });
  }

  isNull(input) {
    if (input === undefined || input === null || input === '')
      return true;
    else
      return false;
  }

  resetCompanyForm(form) {
    form.get('id').setValue('');
    form.get('companyName').setValue('');
    form.get('description').setValue('');
    form.get('industry').setValue('');
    form.get('address').setValue('');
    form.get('location').setValue('');
    form.get('openingStock').setValue('');
    form.get('taxYear').setValue('');
  }

  resetEmployeeForm(form) {
    form.get('id').setValue('');
    form.get('userName').setValue('');
    form.get('profileId').setValue('');
    form.get('designation').setValue('');
    form.get('department').setValue('');
    form.get('salary').setValue('');
    form.get('remarks').setValue('');
    form.get('stockUnits').setValue('');
  }

  saveComapny() {
    let companyName = this.companyForm.get('companyName').value;
    let description = this.companyForm.get('description').value;
    let industry = this.companyForm.get('industry').value;
    let address = this.companyForm.get('address').value;
    let location = this.companyForm.get('location').value;
    let openingStock = this.companyForm.get('openingStock').value;
    let taxYear = this.companyForm.get('taxYear').value;
    let status = 'N';
    let today = new Date();
    let dateTime = today.toISOString();

    let company = {
      "companyName": companyName,
      "description": description,
      "industry": industry,
      "address": address,
      "location": location,
      "openingStock": openingStock,
      "taxYear": taxYear,
      "status": status,
      "createdDate": dateTime,
      "lastModifiedDate": dateTime
    }
    if (this.isNull(companyName) || this.isNull(industry) || this.isNull(description) || this.isNull(address) ||
      this.isNull(location) || this.isNull(openingStock) || this.isNull(taxYear)) {
      this.toastr.error('Please fill all the fields');
      return false;
    }
    else {
      this._companiesService.saveCompany(company).subscribe(result => {
        console.log(result);
        if (result) {
          this.toastr.success('Company Added Successfully...');
          this.modalService.dismissAll();
          this.getAllCompanies();
        }
      },
        (error) => {
          this.toastr.error('Error While Saving Company');
          console.log('Error While Saving the Company');
        }
      )
    }
  }

  onEditRowSelect(event) {
    console.log(event);
    this.companyEditForm.get('id').setValue(event.data.id);
    this.companyEditForm.get('companyName').setValue(event.data.companyName);
    this.companyEditForm.get('description').setValue(event.data.description);
    this.companyEditForm.get('industry').setValue(event.data.industry);
    this.companyEditForm.get('industry').setValue(event.data.industry);
    this.companyEditForm.get('address').setValue(event.data.address);
    this.companyEditForm.get('location').setValue(event.data.location);
    this.companyEditForm.get('openingStock').setValue(event.data.openingStock);
    this.companyEditForm.get('taxYear').setValue(event.data.taxYear);

    if (event.data.status === 'New')
      this.companyEditForm.get('status').setValue('N');
    else if (event.data.status === 'Pending')
      this.companyEditForm.get('status').setValue('P');
    else if (event.data.status === 'Closed')
      this.companyEditForm.get('status').setValue('C');

    this.companyEditForm.get('createdDate').setValue(event.data.createdDate);;
    this.editCompanyPopup(this.editcompanycontent);
  }

  onEmployeeRowSelect(event) {
    this.employeeEditForm.get('id').setValue(event.data.id);
    this.employeeEditForm.get('userName').setValue(event.data.username);
    this.employeeEditForm.get('designation').setValue(event.data.designation);
    this.employeeEditForm.get('department').setValue(event.data.department);
    this.employeeEditForm.get('profileId').setValue(event.data.profileId);
    this.employeeEditForm.get('salary').setValue(event.data.salary);
    this.employeeEditForm.get('remarks').setValue(event.data.remarks);
    this.employeeEditForm.get('stockUnits').setValue(event.data.stockUnits);
    if (event.data.status === 'New')
      this.employeeEditForm.get('status').setValue('N');
    else if (event.data.status === 'Pending')
      this.employeeEditForm.get('status').setValue('P');
    else if (event.data.status === 'Closed')
      this.employeeEditForm.get('status').setValue('C');
    this.employeeEditForm.get('createdDate').setValue(event.data.createdDate);
    this.editEmployeePopup(this.editemployeecontent);
  }

  updateCompany() {
    let id = this.companyEditForm.get('id').value;
    let companyName = this.companyEditForm.get('companyName').value;
    let description = this.companyEditForm.get('description').value;
    let industry = this.companyEditForm.get('industry').value;
    let address = this.companyEditForm.get('address').value;
    let location = this.companyEditForm.get('location').value;
    let openingStock = this.companyEditForm.get('openingStock').value;
    let taxYear = this.companyEditForm.get('taxYear').value;
    let status = this.companyEditForm.get('status').value;
    let createdDate = this.companyEditForm.get('createdDate').value;
    let today = new Date();
    let dateTime = today.toISOString();

    let company = {
      "companyName": companyName,
      "description": description,
      "industry": industry,
      "address": address,
      "location": location,
      "openingStock": openingStock,
      "taxYear": taxYear,
      "status": status,
      "createdDate": createdDate,
      "lastModifiedDate": dateTime
    }
    if (this.isNull(companyName) || this.isNull(industry) || this.isNull(description) || this.isNull(address) ||
      this.isNull(location) || this.isNull(openingStock) || this.isNull(taxYear)) {
      this.toastr.error('Please fill all the fields');
      return false;
    }
    else {
      this._companiesService.updateCompany(company, id).subscribe(result => {
        console.log(result);
        if (result) {
          this.toastr.success('Company Updated Successfully...');
          this.modalService.dismissAll();
          this.getAllCompanies();
        }
      },
        (error) => {
          this.toastr.error('Error While updating the Company');
          console.log('Error While updating the Company');
        }
      )
    }
  }


  showEmployeesData(event) {
    this.cmpName  = event.data.companyName;
    this.showCompanyEmployees(event.data.id);
  }

  showCompanyEmployees(companyid) {
    console.log('Data :', event);
    let status = '';
    this.employeeForm.get('companyId').setValue(companyid);
    let companyid1 = this.employeeForm.get('companyId').value;
    console.log('Selected Company Is:', companyid1);
    this.employeeTableData = [];
    this._companiesService.getCompanyEmployeesById(companyid).subscribe(result => {
      console.log('Company :' + companyid + ' Employees: ', result);
      if (result) {
        result.forEach(data => {
          if (data.status === 'N')
            status = 'New';
          else if (data.status === 'P')
            status = 'Pending';
          else if (data.status === 'C')
            status = 'Closed';
          this.employeeTableData.push({
            'id': data.id, 'username': data.username, 'profileId': data.profileId,
            'designation': data.designation, 'department': data.department, 'salary': data.salary,
            'remarks': data.remarks, 'status': status, 'stockUnits': data.stockUnits
          });
          this.showEmployees = true;
          this.noRecordsFound = '';
        })
        this.employeeSource = new LocalDataSource(this.employeeTableData);
      }
      else {
        this.showEmployees = false;
        this.noRecordsFound = 'No Records Found';
      }
    },
      (error) => {
        this.toastr.error('Error While fetching employees for Company :' + companyid);
        console.log('Error While fetching employees for Company :', companyid);
      }
    )
  }

  addEmployeePopup(addemployeecontent) {
    this.resetEmployeeForm(this.employeeForm);
    this.modalService.open(addemployeecontent, { size: 'lg' });
  }

  editEmployeePopup(editemployeecontent) {
    this.modalService.open(editemployeecontent, { size: 'lg' });
  }

  saveCompanyEmployee() {
    let today = new Date();
    let dateTime = today.toISOString();
    let userName = this.employeeForm.get('userName').value;
    let profileId = this.employeeForm.get('profileId').value;
    let designation = this.employeeForm.get('designation').value;
    let department = this.employeeForm.get('department').value;
    let salary = this.employeeForm.get('salary').value;
    let remarks = this.employeeForm.get('remarks').value;
    let stockUnits = this.employeeForm.get('stockUnits').value;
    let status = 'N';
    let companyid = this.employeeForm.get('companyId').value

    let employee = {
      "username": userName,
      "profileId": profileId,
      "designation": designation,
      "department": department,
      "salary": salary,
      "remarks": remarks,
      "stockUnits": stockUnits,
      "status": status,
      "createdDate": dateTime,
      "lastModifiedDate": dateTime
    }
    if (this.isNull(userName) || this.isNull(profileId) || this.isNull(designation) || this.isNull(department) ||
      this.isNull(salary) || this.isNull(remarks) || this.isNull(stockUnits)) {
      this.toastr.error('Please fill all the fields');
      return false;
    }
    else {
      this._companiesService.saveCompanyEmployee(companyid, employee).subscribe(result => {
        console.log(result);
        if (result) {
          this.modalService.dismissAll();
          this.toastr.success('Employee Added Successfully...');
          this.showCompanyEmployees(companyid);
        }
      },
        (error) => {
          this.toastr.error('Error While Saving the Employee');
        }
      )
    }
  }

  updateCompanyEmployee() {
    let empid = this.employeeEditForm.get('id').value;
    let userName = this.employeeEditForm.get('userName').value;
    let profileId = this.employeeEditForm.get('profileId').value;
    let designation = this.employeeEditForm.get('designation').value;
    let department = this.employeeEditForm.get('department').value;
    let salary = this.employeeEditForm.get('salary').value;
    let remarks = this.employeeEditForm.get('remarks').value;
    let stockUnits = this.employeeEditForm.get('stockUnits').value;
    let status = this.employeeEditForm.get('status').value;
    let companyid = this.employeeForm.get('companyId').value;
    let createdDate = this.employeeEditForm.get('createdDate').value;
    let today = new Date();
    let dateTime = today.toISOString();

    let employee = {
      "id": empid,
      "username": userName,
      "profileId": profileId,
      "designation": designation,
      "department": department,
      "salary": salary,
      "remarks": remarks,
      "stockUnits": stockUnits,
      "status": status,
      "createdDate": createdDate,
      "lastModifiedDate": dateTime
    }
    if (this.isNull(userName) || this.isNull(profileId) || this.isNull(designation) || this.isNull(department) ||
      this.isNull(salary) || this.isNull(remarks) || this.isNull(stockUnits)) {
      this.toastr.error('Please fill all the fields');
      return false;
    }
    else {
      this._companiesService.updateCompanyEmployee(companyid, empid, employee).subscribe(result => {
        console.log(result);
        if (result) {
          this.modalService.dismissAll();
          this.toastr.success('Employee Updated Successfully...');
          this.showCompanyEmployees(companyid);
        }
      },
        (error) => {
          this.toastr.error('Error While Saving the Employee');
        }
      )
    }
  }

}
