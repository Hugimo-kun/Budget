import { Component, inject, OnInit, Pipe } from '@angular/core';
import { IBudget } from '../../shared/ibudget';
import { BudgetService } from '../../shared/budget.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  budgets: IBudget[] = [];
  service = inject(BudgetService);
  router = inject(Router);
  solde: number = 0;

  ngOnInit(): void {
    if (history.state.isConnected) {
      this.router.navigate(['/dashboard']);
    }
    this.getBudget();
  }

  getBudget() {
    this.budgets = this.service.fetchAll();
  }

  getSolde(index: number) {
    let solde: number = 0;
    for (let i = 0; i <= index; i++) {
      if (this.budgets[i].type === 'Revenu') {
        solde += this.budgets[i].montant;
      } else {
        solde -= this.budgets[i].montant;
      }
    }
    return solde;
  }

  deleteEntry(id: number) {
    this.service.deleteBudget(id);
    this.getBudget();
  }

  public form: FormGroup = new FormGroup({
    date: new FormControl(''),
    categorie: new FormControl(''),
    titre: new FormControl(''),
    montant: new FormControl(''),
    type: new FormControl(''),
  });

  addEntry() {
    let newEntry = {
      date: this.form.get('date')?.value,
      categorie: this.form.get('categorie')?.value,
      titre: this.form.get('titre')?.value,
      montant: this.form.get('montant')?.value,
      type: this.form.get('type')?.value,
    };

    this.service.addBudget(newEntry);
    this.getBudget();
  }
}
