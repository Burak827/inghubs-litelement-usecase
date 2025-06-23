import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';
import { selectEmployees, updateEmployee, deleteEmployee } from '../redux/employeeSlice.js';
import { store } from '../redux/store.js';
import './app-navbar.js';
import './employee-list.js';
import './employee-table.js';
import './confirmation-dialog.js';
import './employee-edit-dialog.js';

export class EmployeesPage extends LitElement {
    static properties = {
        baseEmployees: { type: Array },
        view: { type: String },
        searchTerm: { type: String },
        deleteDialogOpen: { type: Boolean },
        deleteDialogId: { type: String },
        deleteDialogName: { type: String },
        editDialogOpen: { type: Boolean },
        editDialogEmployee: { type: Object }
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

        .search-container {
            flex: 1;
            display: flex;
            justify-content: center;
            font-size: 2rem;
        }
        .search-container input {
            width: 60%;
            border: 1px solid #ccc;
            max-width: 300px;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 1.2rem;
        }
        .search-container input:focus {
            border: 1px solid #ccc;
            outline: none;
            border-color: #FF784F;
        }
        .search-container .clear-btn {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: -1.5rem;
            color: #888;
        }
        .search-container .clear-btn:hover {
            color: #FF784F;
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
        this.searchTerm = '';
        this._unsubscribe = null
        this.deleteDialogOpen = false;
        this.deleteDialogId = '';
        this.deleteDialogName = '';
        this.editDialogOpen = false;
        this.editDialogEmployee = null;
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
        this.addEventListener('delete-request', this._onDeleteRequest);
        this.addEventListener('confirm-delete', this._onConfirmDelete);
        this.addEventListener('cancel-delete', this._onCancelDelete);
        this.addEventListener('edit-request', this._onEditRequest);
        this.addEventListener('form-saved', this._onFormSaved);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }

    _onSearchInput(e) {
        this.searchTerm = e.target.value;
    }

    _onDeleteRequest(e) {
        const id = e.detail.id;
        const emp = this.baseEmployees.find(x => x.id === id);
        this.deleteDialogId = id;
        this.deleteDialogName = `${emp.firstName} ${emp.lastName}`;
        this.deleteDialogOpen = true;
    }

    _onConfirmDelete() {
        store.dispatch(deleteEmployee({
            id: this.deleteDialogId
        }));
        this.deleteDialogOpen = false;
    }

    _onCancelDelete() {
        this.deleteDialogOpen = false;
    }

    _clearSearch() {
        this.searchTerm = '';
    }

    _onEditRequest(e) {
        const id = e.detail.id;
        const emp = this.baseEmployees.find(x => x.id === id);
        this.editDialogEmployee = { ...emp };
        this.editDialogOpen = true;
    }

    _onFormSaved(e) {
        console.log('Form saved:', e.detail);
        const { employee } = e.detail;
        store.dispatch(updateEmployee({ employee }));
        this.editDialogOpen = false;
    }

    get filteredEmployees() {
        const term = this.searchTerm.trim().toLowerCase();
        if (!term) return this.baseEmployees;
        return this.baseEmployees.filter(emp =>
            Object.values(emp).some(val =>
                String(val).toLowerCase().includes(term)
            )
        );
    }

    render() {
        return html`
        <app-navbar></app-navbar>
        <employee-edit-dialog 
            .open=${this.editDialogOpen} 
            .employee=${this.editDialogEmployee}>
        </employee-edit-dialog>
        <confirmation-dialog
            .open=${this.deleteDialogOpen}
            title=${msg('Are you sure?')}
            message=${msg(str`Selected Employee record of ${this.deleteDialogName} will be deleted`)}>
        </confirmation-dialog>
        <div class="container">
            <div class="header">
                <h1 class="title">${this.view === 'list' ? msg('Employee List') : msg('Employee Table')}</h1>
                <div class="search-container">
                  <input
                    type="text"
                    placeholder=${msg('Search')}...
                    .value=${this.searchTerm}
                    @input=${this._onSearchInput}
                  />
                  <button
                    class="clear-btn"
                    ?hidden=${!this.searchTerm}
                    @click=${this._clearSearch}
                    aria-label=${msg('Clear search')}
                  >
                    ×
                  </button>
                </div>
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
                html`<employee-list .employees=${this.filteredEmployees}></employee-list>` :
                html`<employee-table .employees=${this.filteredEmployees}></employee-table>`
            }
        </div>`;
    }
}

customElements.define('employees-page', EmployeesPage);