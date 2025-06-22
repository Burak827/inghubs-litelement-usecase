

import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { msg } from '@lit/localize';
import { updateWhenLocaleChanges } from '@lit/localize';

export class EmployeeTable extends LitElement {
  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number }
  };

  static styles = css`
    .list-container {
      display: flex;
      flex-direction: column;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;
      border: 1px solid #ccc;
    }

    th.list-column, td.list-column {
      padding: 0.75rem 0.5rem;
      border: 1px solid #eee;
      text-align: left;
    }

    th.list-title {
      font-weight: bold;
      background: #f9f9f9;
      color: #FF784F;
    }

    .bold {
      font-weight: bold;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .pagination button {
      margin: 0 0.25rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
    }

    .pagination button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .pagination button.active {
      font-weight: bold;
      border-color: #FF784F;
      color: #FF784F;
    }

    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    updateWhenLocaleChanges(this);
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page) {
    this.currentPage = page;
  }

  render() {
    return html`
      <div class="list-container">
        <table>
          <thead>
            <tr class="list-item">
              <th class="list-column list-title"><input class="checkbox" type="checkbox" /></th>
              <th class="list-column list-title">${msg('First Name')}</th>
              <th class="list-column list-title">${msg('Last Name')}</th>
              <th class="list-column list-title">${msg('Date of Employment')}</th>
              <th class="list-column list-title">${msg('Date of Birth')}</th>
              <th class="list-column list-title">${msg('Phone')}</th>
              <th class="list-column list-title">${msg('Email')}</th>
              <th class="list-column list-title">${msg('Department')}</th>
              <th class="list-column list-title">${msg('Position')}</th>
              <th class="list-column list-title">${msg('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${repeat(this.paginatedEmployees, employee => employee.id, employee => html`
              <tr class="list-item">
                <td class="list-column"><input class="checkbox" type="checkbox" /></td>
                <td class="list-column bold">${employee.firstName}</td>
                <td class="list-column bold">${employee.lastName}</td>
                <td class="list-column">${employee.dateOfEmployment}</td>
                <td class="list-column">${employee.dateOfBirth}</td>
                <td class="list-column">${employee.phone}</td>
                <td class="list-column">${employee.email}</td>
                <td class="list-column">${employee.department}</td>
                <td class="list-column">${employee.position}</td>
                <td class="list-column">
                  <employee-actions .id=${employee.id}></employee-actions>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
        <div class="pagination">
          <button 
            ?disabled=${this.currentPage === 1} 
            @click=${() => this.previousPage()}>
            ‹ ${msg('Previous')}
          </button>
          ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(page => html`
            <button
              class=${this.currentPage === page ? 'active' : ''}
              @click=${() => this.goToPage(page)}>
              ${page}
            </button>
          `)}
          <button
            ?disabled=${this.currentPage === this.totalPages}
            @click=${() => this.nextPage()}>
             ${msg('Next')} ›
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-table', EmployeeTable);