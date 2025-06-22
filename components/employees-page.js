import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';
import { selectEmployees } from '../redux/employeeSlice.js';
import { store } from '../redux/store.js';
import './app-navbar.js';
import './employee-list.js';

export class EmployeesPage extends LitElement {
    static properties = {
        baseEmployees: { type: Array },
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
        `;

    constructor() {
        super();
        this.baseEmployees = []
        updateWhenLocaleChanges(this);
        this.view = 'list';
        this._unsubscribe = null
    }

    toggleView(view) {
        this.view = view;
    }

    connectedCallback() {
        super.connectedCallback()
        this.baseEmployees = selectEmployees(store.getState());
        this._unsubscribe = store.subscribe(() => {
            this.baseEmployees = selectEmployees(store.getState());
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }

    render() {
        return html`
        <app-navbar></app-navbar>
        <div class="container">
            <div class="header">
                <h1 class="title">${this.view === 'list' ? msg('Employee List') : msg('Employee Table')}</h1>
                <div class="view-switcher">
                    <button
                      class="switch-button list-switch"
                      @click="${() => this.toggleView('list')}"
                      aria-pressed="${this.view === 'list'}">
                    </button>
                    <button
                      class="switch-button table-switch"
                      @click="${() => this.toggleView('data')}"
                      aria-pressed="${this.view === 'data'}">
                    </button>
                </div>
            </div>
        ${this.view === 'list' ?
                html`<employee-list .employees=${this.baseEmployees}></employee-list>` :
                html`<employee-table .employees=${this.baseEmployees}></employee-table>`
            }
        </div>`;
    }
}

customElements.define('employees-page', EmployeesPage);