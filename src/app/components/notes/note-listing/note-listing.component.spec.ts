import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListingComponent } from './note-listing.component';

describe('NoteListingComponent', () => {
  let component: NoteListingComponent;
  let fixture: ComponentFixture<NoteListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
