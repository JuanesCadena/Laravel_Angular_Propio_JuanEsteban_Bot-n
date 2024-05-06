import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilemaComponent } from './dilema.component';

describe('DilemaComponent', () => {
  let component: DilemaComponent;
  let fixture: ComponentFixture<DilemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
