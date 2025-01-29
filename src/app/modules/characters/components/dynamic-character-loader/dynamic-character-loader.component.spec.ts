import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCharacterLoaderComponent } from './dynamic-character-loader.component';

describe('DynamicCharacterLoaderComponent', () => {
  let component: DynamicCharacterLoaderComponent;
  let fixture: ComponentFixture<DynamicCharacterLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicCharacterLoaderComponent]
    });
    fixture = TestBed.createComponent(DynamicCharacterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
