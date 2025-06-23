import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import './employee-form.js';

export class EmployeeEditDialog extends LitElement {
    static properties = {
        open: { type: Boolean, reflect: true },
        employee: { type: Object }
    };

    static styles = css`
    :host { display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        align-items: center;
        justify-content: center;
        z-index: 1000;
        font-family: sans-serif;
    }

    :host([open]) { 
        display: flex;
    }

    .dialog { 
        background: #fff;
        border-radius:8px;
        width: 90%;
        max-width:500px;
        max-height: 90vh;
        box-shadow:0 4px 12px rgba(0,0,0,0.15);
        overflow:hidden;
        position: relative;
    }
    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .title {
        color: #FF784F;
        font-size: 1.6rem;
        font-weight: 400;
        text-align: center;
        margin: 1rem 0;
    }

    @media (max-width: 600px) {
        .dialog {
            width: 100vw !important;
            height: 100vh !important;
            max-width: none;
            max-height: none;
            border-radius: 0;
        }
    }
    `;

    constructor() {
        super();
        this.open = false;
        updateWhenLocaleChanges(this);
        this.addEventListener('click', (e) => {
            if (e.target === this) {
                this._onCancel();
            }
        });
    }

    render() {
        return html`
        <div class="dialog" @click=${e => e.stopPropagation()}>
            <button class="close-button" @click=${this._onCancel} aria-label="Close">&times;</button>
            <h2 class="title">${msg('Edit Employee')}</h2>
            <employee-form
                .employee=${this.employee}
                @save=${this._onSave}
                @cancel=${this._onCancel}>
            </employee-form>
        </div>
    `;
    }

    _onSave(e) {
        this.dispatchEvent(new CustomEvent('form-saved', {
            detail: e.detail,
            bubbles: true,
            composed: true
        }));
        this.open = false;
    }

    _onCancel() {
        this.dispatchEvent(new CustomEvent('form-cancelled', {
            bubbles: true,
            composed: true
        }));
        this.open = false;
    }
}

customElements.define('employee-edit-dialog', EmployeeEditDialog);