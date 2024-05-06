import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDilemaComponent } from './create-dilema.component';

describe('CreateDilemaComponent', () => {
  let component: CreateDilemaComponent;
  let fixture: ComponentFixture<CreateDilemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDilemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDilemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
