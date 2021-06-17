import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddQuantityProductPage } from './add-quantity-product.page';

describe('AddQuantityProductPage', () => {
  let component: AddQuantityProductPage;
  let fixture: ComponentFixture<AddQuantityProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuantityProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuantityProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
