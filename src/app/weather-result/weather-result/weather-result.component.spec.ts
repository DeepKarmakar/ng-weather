import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResultComponent } from './weather-result.component';

describe('WeatherResultComponent', () => {
  let component: WeatherResultComponent;
  let fixture: ComponentFixture<WeatherResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
