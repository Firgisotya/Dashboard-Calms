import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakComponent } from './cetak.component';

describe('CetakComponent', () => {
  let component: CetakComponent;
  let fixture: ComponentFixture<CetakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
