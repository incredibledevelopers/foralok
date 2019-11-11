import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADMIN_ROUTES, USER_ROUTES } from './menu-items';
import { ConceptService } from '../../services/concept/concept.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [ConceptService],
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  role: string = '';

  // this is for the open close
  addExpandClass(element: any) {
    // if(element === 'Concept')
    //   this._conceptService.setLoadConceptCmp("no");
    // if (element === this.showMenu) {
    //   this.showMenu = '0';
    // } else {
    //   this.showMenu = element;
    // }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private _conceptService: ConceptService) {}
  // End open close
  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    if (this.role === 'ADMIN')
      this.sidebarnavItems = ADMIN_ROUTES.filter(sidebarnavItem => sidebarnavItem);
    else if (this.role === 'USER')
     this.sidebarnavItems = USER_ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
