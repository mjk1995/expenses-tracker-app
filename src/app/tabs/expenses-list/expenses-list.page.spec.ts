import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensesListPage } from './expenses-list.page';

describe('ExpensesListPage', () => {
  let component: ExpensesListPage;
  let fixture: ComponentFixture<ExpensesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesListPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
