import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './employee-actions.js';
export class EmployeeList extends LitElement {
    static properties = {
        employees: { type: Array },
        currentPage: { type: Number },
        itemsPerPage: { type: Number },
    };

    static styles = css`
        .list-container {
            background-color: #F8F8F8;
            height: 100%;
        }

        .list-title {
            color:#FF784F;
            font-weight: 600;
        }

        .list-item {
            display: grid;
            grid-template-columns: 5rem 10% 10% 15% 10% 10% 10% 10% 10% 10%;
            align-items: center;
            background: white;
            height: 5rem;
            margin-bottom: 3px;
        }

        .checkbox {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #FF784F;
            background-color: white;
            cursor: pointer;    
        }

        .list-column {
            justify-self: center;
            align-self: center;
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
`;

    constructor() {
        super();
        this.currentPage = 1;
        this.itemsPerPage = 10; // adjust as needed
        updateWhenLocaleChanges(this);
        this._unsubscribe = null
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

    connectedCallback() {
        super.connectedCallback()
    }

    render() {
        return html`
            <div class="list-container">   
                <ul>
                    <li class="list-item">
                            <div class="list-column list-title"><input class="checkbox" type="checkbox" /></div>
                            <div class="list-column list-title">${msg('First Name')}</div>
                            <div class="list-column list-title">${msg('Last Name')}</div>
                            <div class="list-column list-title">${msg('Date of Employment')}</div>
                            <div class="list-column list-title">${msg('Date of Birth')}</div>
                            <div class="list-column list-title">${msg('Phone')}</div>
                            <div class="list-column list-title">${msg('Email')}</div>
                            <div class="list-column list-title">${msg('Department')}</div>
                            <div class="list-column list-title">${msg('Position')}</div>
                            <div class="list-column list-title">${msg('Actions')}</div>
                    </li>
                    ${repeat(
            this.paginatedEmployees,
            (employee) => employee.id,
            (employee) => html`
                        <li class="list-item">
                            <div class="list-column"><input class="checkbox" type="checkbox" /></div>
                            <div class="list-column bold">${employee.firstName}</div>
                            <div class="list-column bold">${employee.lastName}</div>
                            <div class="list-column">${employee.dateOfEmployment}</div>
                            <div class="list-column">${employee.dateOfBirth}</div>
                            <div class="list-column">${employee.phone}</div>
                            <div class="list-column">${employee.email}</div>
                            <div class="list-column">${employee.department}</div>
                            <div class="list-column">${employee.position}</div>
                            <div class="list-column ">
                               <employee-actions .id=${employee.id}></employee-actions>
                            </div>
                        </li> `
        )}
                </ul>
                <div class="pagination">
                  <button 
                    ?disabled=${this.currentPage === 1} 
                    @click=${() => this.previousPage()}>
                    ‹ Previous
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
                    Next ›
                  </button>
                </div>
        </div>`;
    }
}
customElements.define('employee-list', EmployeeList);