import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './employee-actions.js';
export class EmployeeList extends LitElement {
    static properties = {
        employees: { type: Array },
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
`;

    constructor() {
        super();
        this.employees = [];
        updateWhenLocaleChanges(this);
        this._unsubscribe = null
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
                            <div class="list-column ">
                               <employee-actions .id=${employee.id}></employee-actions>
                            </div>
                        </li> `
        )}
                </ul>
        </div>`;
    }
}
customElements.define('employee-list', EmployeeList);