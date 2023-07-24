import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilCetakComponent } from './hasil-cetak.component';

describe('HasilCetakComponent', () => {
  let component: HasilCetakComponent;
  let fixture: ComponentFixture<HasilCetakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HasilCetakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HasilCetakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
