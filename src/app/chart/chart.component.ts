import { Component, inject, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BudgetService } from '../../shared/budget.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, RouterLink],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  data!: ChartConfiguration<'pie'>['data'];
  service = inject(BudgetService);

  ngOnInit() {
    const budgets = this.service.fetchAll();

    // Regrouper les montants par catégorie
    const groupedBudgets = budgets.reduce((acc, budget) => {
      if (!acc[budget.categorie]) {
        acc[budget.categorie] = 0;
      }
      acc[budget.categorie] += budget.montant;
      return acc;
    }, {} as { [key: string]: number });

    // Créer les tableaux de labels et de données
    const titres = Object.keys(groupedBudgets);
    const montants = Object.values(groupedBudgets);

    this.data = {
      labels: titres,
      datasets: [
        {
          label: 'Montants',
          data: montants,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(199, 199, 199, 0.2)',
            'rgba(255, 99, 71, 0.2)',
            'rgba(144, 238, 144, 0.2)',
            'rgba(173, 216, 230, 0.2)',
            'rgba(238, 130, 238, 0.2)',
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
