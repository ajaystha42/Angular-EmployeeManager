import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompareComponent } from './add-compare.component';

describe('AddCompareComponent', () => {
  let component: AddCompareComponent;
  let fixture: ComponentFixture<AddCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
