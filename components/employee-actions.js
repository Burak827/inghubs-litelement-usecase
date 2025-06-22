import { updateWhenLocaleChanges } from '@lit/localize';
import { LitElement, css, html } from 'lit';

export class EmployeeActions extends LitElement {
    static properties = {
        id: { type: String },
    };

    static styles = css`
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
        updateWhenLocaleChanges(this);
    }

    render() {
        return html`
       <div class="actions">
            <button class="edit-button" @click=${() => this._editEmployee(this.id)}></button>
            <button class="delete-button"
            @click=${() => this.dispatchEvent(new CustomEvent('delete-request', {
                    detail: { id: this.id },
                    bubbles: true,
                    composed: true
                }))}>
            </button>
       </div>`;
    }

    _editEmployee(id) {
        console.log(`Delete employee with id: ${id}`);
    }

    _deleteEmployee(id) {
        console.log(`Delete employee with id: ${id}`);
    }
}
customElements.define('employee-actions', EmployeeActions);