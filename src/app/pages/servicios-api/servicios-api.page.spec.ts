import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosApiPage } from './servicios-api.page';

describe('ServiciosApiPage', () => {
  let component: ServiciosApiPage;
  let fixture: ComponentFixture<ServiciosApiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
