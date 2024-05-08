import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemondLodingComponent } from './demond-loding.component';

describe('DemondLodingComponent', () => {
  let component: DemondLodingComponent;
  let fixture: ComponentFixture<DemondLodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemondLodingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemondLodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
