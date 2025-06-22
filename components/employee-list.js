import { LitElement, html, css } from 'lit';
import './app-navbar.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { repeat } from 'lit/directives/repeat.js';
import { selectEmployees } from '../redux/employeeSlice.js';
import { store } from '../redux/store.js';

export class EmployeeList extends LitElement {
    static properties = {
        employees: { type: Array },
        view: { type: String }
    };

    static styles = css`
        .container {
            font-family: sans-serif;
            margin: 1rem 2rem;          
        }
        
        .title {
            color:#FF784F;
            font-size: 1.6rem;
            font-weight: 400;
        }

        .list-title {
            color:#FF784F;
            font-weight: 600;
        }

        .list-container {
            background-color: #F8F8F8;
            height: 100%;
        }

        .list-item {
            display: grid;
            grid-template-columns: 5rem 10% 10% 15% 10% 10% 10% 10% 10% 10%;
            align-items: center;
            background: white;
            height: 5rem;
            margin-bottom: 3px;
        }

        .list-column {
            justify-self: center;
            align-self: center;
        }

        .checkbox {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #FF784F;
            background-color: white;
            cursor: pointer;    
        }

        .bold {
            font-weight: bold;
        }

        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }

        .view-switcher {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .switch-button{
            all: unset;
            cursor: pointer;
        }

        .list-switch::before {
            -webkit-mask: url(/assets/icons/list.svg) no-repeat 50% 50%;
            mask: url(/assets/icons/list.svg) no-repeat 50% 50%;
              content: '';
            -webkit-mask-size: cover;
            mask-size: cover;
            background-color: #FF784F;
            display: inline-block;
            width: 2.6rem;   
            height: 2.6rem;
            margin-bottom: 2px;
            vertical-align: middle;
        }

        .table-switch::before {
            -webkit-mask: url(/assets/icons/table.svg) no-repeat 50% 50%;
            mask: url(/assets/icons/table.svg) no-repeat 50% 50%;
              content: '';
            -webkit-mask-size: cover;
            mask-size: cover;
            background-color: #FF784F;
            display: inline-block;
            width: 2.6rem;   
            height: 2.6rem;
            margin-bottom: 2px;
            vertical-align: middle;
        }
            
        .switch-button {
            opacity: 0.4;
            transition: opacity 0.2s;
        }

        .switch-button[aria-pressed="true"] {
            opacity: 1;
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        .edit-button {
            all: unset;
            cursor: pointer;
        }

        .edit-button::before {
            -webkit-mask: url(/assets/icons/edit.svg) no-repeat 50% 50%;
            mask: url(/assets/icons/edit.svg) no-repeat 50% 50%;
              content: '';
            -webkit-mask-size: cover;
            mask-size: cover;
            background-color: #FF784F;
            display: inline-block;
            width: 1.2rem;   
            height: 1.2rem;
            margin-bottom: 2px;
            vertical-align: middle;
        }

        .delete-button {
            all: unset;
            cursor: pointer;
        }

        .delete-button::before {
            -webkit-mask: url(/assets/icons/delete.svg) no-repeat 50% 50%;
            mask: url(/assets/icons/delete.svg) no-repeat 50% 50%;
              content: '';
            -webkit-mask-size: cover;
            mask-size: cover;
            background-color: #FF784F;
            display: inline-block;
            width: 1.2rem;   
            height: 1.2rem;
            margin-bottom: 2px;
            vertical-align: middle;
        }
        `;

    constructor() {
        super();
        this.employees = []
        updateWhenLocaleChanges(this);
        this.view = 'list';
        this._unsubscribe = null
    }

    toggleView(view) {
        this.view = view;
    }

    connectedCallback() {
        super.connectedCallback()
        this.employees = selectEmployees(store.getState())
        this._unsubscribe = store.subscribe(() => {
            this.employees = selectEmployees(store.getState())
        })
    }

    render() {
        return html`
        <app-navbar></app-navbar>
        <div class="container">
            <div class="header">
                <h1 class="title">${msg('Employee List')}</h1>
                <div class="view-switcher">
                    <button
                      class="switch-button list-switch"
                      @click="${() => this.toggleView('list')}"
                      aria-pressed="${this.view === 'list'}"
                      aria-label="Liste görünümü">
                    </button>
                    <button
                      class="switch-button table-switch"
                      @click="${() => this.toggleView('data')}"
                      aria-pressed="${this.view === 'data'}"
                      aria-label="Tablo görünümü">
                    </button>
                </div>
            </div>
            <div class="list-container">   
                <ul>
                    <li class="list-item">
                            <div class="list-column list-title"><input class="checkbox" type="checkbox" /></div>
                            <div class="list-column list-title">${msg('First Name')}</div>
                            <div class="list-column list-title">${msg('Last Name')}</div>
                            <div class="list-column list-title">${msg('Date Of Employement')}</div>
                            <div class="list-column list-title">${msg('Date Of Birth')}</div>
                            <div class="list-column list-title">${msg('Phone')}</div>
                            <div class="list-column list-title">${msg('Email')}</div>
                            <div class="list-column list-title">${msg('Department')}</div>
                            <div class="list-column list-title">${msg('Position')}</div>
                            <div class="list-column list-title">${msg('Actions')}</div>
                    </li>
                    ${repeat(
            this.employees,
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
                            <div class="list-column actions">
                                <button class="edit-button" @click=${() => this._editEmployee(employee.id)}></button>
                                <button class="delete-button" @click=${() => this._deleteEmployee(employee.id)} ></button>
                            </div>
                        </li> `
        )}
                </ul>
            </div>
        </div>`;
    }
    _editEmployee(id) {
        console.log(`Delete employee with id: ${id}`);
    }

    _deleteEmployee(id) {
        console.log(`Delete employee with id: ${id}`);
    }
}
customElements.define('employee-list', EmployeeList);