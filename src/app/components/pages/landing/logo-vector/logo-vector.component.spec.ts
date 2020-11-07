import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoVectorComponent } from './logo-vector.component';

describe('LogoVectorComponent', () => {
  let component: LogoVectorComponent;
  let fixture: ComponentFixture<LogoVectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoVectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoVectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
