import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterExpensesPage } from './filter-expenses.page';

describe('FilterExpensesPage', () => {
  let component: FilterExpensesPage;
  let fixture: ComponentFixture<FilterExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
