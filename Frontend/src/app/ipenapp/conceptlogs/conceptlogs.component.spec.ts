import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptlogsComponent } from './conceptlogs.component';

describe('ConceptlogsComponent', () => {
  let component: ConceptlogsComponent;
  let fixture: ComponentFixture<ConceptlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
