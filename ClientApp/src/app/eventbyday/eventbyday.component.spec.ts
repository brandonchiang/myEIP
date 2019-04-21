import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventbydayComponent } from './eventbyday.component';

describe('EventbydayComponent', () => {
  let component: EventbydayComponent;
  let fixture: ComponentFixture<EventbydayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventbydayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventbydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
