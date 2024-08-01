import { Component, inject } from '@angular/core';
import { IBudget } from '../../shared/ibudget';
import { BudgetService } from '../../shared/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  budgets: IBudget[] = [];
  service = inject(BudgetService);
  router = inject(Router);

  ngOnInit(): void {
    if (history.state.isConnected) {
      this.router.navigate(['/dashboard']);
    }
    this.getBudget();
  }

  getBudget() {
    this.budgets = this.service.fetchAll();
  }
}
