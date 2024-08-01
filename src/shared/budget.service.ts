import { Injectable } from '@angular/core';
import { mockBudget } from './mockBudget';
import { IBudget } from './ibudget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor() {}

  fetchAll() {
    return mockBudget;
  }

  deleteBudget(id: number) {
    mockBudget.splice(id, 1);
  }

  addBudget(entry: any) {
    mockBudget.push(entry);
  }
}
