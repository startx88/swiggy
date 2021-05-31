import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRecipeComponent } from './partner-recipe.component';

describe('PartnerRecipeComponent', () => {
  let component: PartnerRecipeComponent;
  let fixture: ComponentFixture<PartnerRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
