import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

export class ConfirmationDialog extends LitElement {
    static properties = {
        open: { type: Boolean, reflect: true },
        title: { type: String },
        message: { type: String }
    };

    static styles = css`
    :host {
        display: none;
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
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        overflow: hidden; 
    }

    .header {
        padding: 1rem;
        font-size: 1.125rem;
        font-weight: bold;
        color: #FF784F; 
    }

    .body {
        padding: 0 1rem 1rem;
        color: #333; 
    }

    .footer {
        display: flex;
        gap: .5rem;
        padding: 1rem; 
    }

    .btn {
        flex:1;
        padding:.75rem;
        border:none;
        border-radius:4px;
        cursor:pointer;
        font-family: sans-serif;
    }

    .btn.cancel {
        background:#fff;
        border:1px solid #FF784F;
        color:#FF784F;
    }

    .btn.confirm{
        background:#FF784F;
        color:#fff;
    }
  `;

    constructor() {
        super();
        updateWhenLocaleChanges(this);
        this.open = false;
        this.title = '';
        this.message = '';
    }

    render() {
        return html`
      <div class="dialog" @click=${e => e.stopPropagation()}>
        <div class="header">${this.title}</div>
        <div class="body">${this.message}</div>
        <div class="footer">
          <button class="btn cancel" @click=${this._cancel}>${msg('Cancel')}</button>
          <button class="btn confirm" @click=${this._confirm}>${msg('Proceed')}</button>
        </div>
      </div>
    `;
    }

    _confirm() {
        this.dispatchEvent(new CustomEvent('confirm-delete', { bubbles: true, composed: true }));
        this.open = false;
    }
    _cancel() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('cancel-delete', { bubbles: true, composed: true }));
    }
}

customElements.define('confirmation-dialog', ConfirmationDialog);