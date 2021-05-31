import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOrderComponent } from './partner-order.component';

describe('PartnerOrderComponent', () => {
  let component: PartnerOrderComponent;
  let fixture: ComponentFixture<PartnerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
