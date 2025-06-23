import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Router } from '@vaadin/router';
import { LitElement, css, html } from 'lit';
import { addEmployee } from '../redux/employeeSlice.js';
import { store } from '../redux/store.js';

export class EmployeeForm extends LitElement {
  static styles = css`
    :host {
      flex: 1 auto;
      font-family: sans-serif;
    }

    form {
      display: grid;
      grid-gap: 1rem;
      background: #f9f9f9;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      max-height: 90vh;
      grid-template-columns: repeat(2, 1fr);
      width: 90%;
      margin: 0 auto;
    }
    
    label {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: #333;
    }

    input, select {
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
    }

    .error {
      color: #d9534f;
      background: #f2dede;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    button {
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      width: 100%;
      box-sizing: border-box;
    }

    button:hover {
      background-color: #0056b3;
    }
    @media (max-width: 480px) {
      :host {
        padding: 0 0.5rem;
        margin: 1rem auto;
      }
      form {
        grid-gap: 0.75rem;
        padding: 1rem;
      }
      h1 {
        font-size: 1.25rem;
        text-align: center;
      }
    }

    @media (max-width: 600px) {
      form {
        grid-template-columns: 1fr;
      }
    }
  `;
  static properties = {
    employee: { type: Object },
    errorMessage: { type: String }
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    }
  }

  render() {
    const isEdit = Boolean(this.employee && this.employee.id);
    return html`
        <form @submit="${this._handleSubmit}">
            ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
            <label>${msg('First Name')}
                <input name="firstName" .value="${this.employee.firstName || ''}" @input="${this._handleInputChange}" required />
            </label>
            <label>${msg('Last Name')}
                <input name="lastName" .value="${this.employee.lastName || ''}" @input="${this._handleInputChange}" required />
            </label>
            <label>${msg('Date of Employment')}
                <input type="date" name="dateOfEmployment" .value="${this.employee.dateOfEmployment || ''}" @input="${this._handleInputChange}" required />
            </label>
            <label>${msg('Date of Birth')}
                <input type="date" name="dateOfBirth" .value="${this.employee.dateOfBirth || ''}" @input="${this._handleInputChange}" required />
            </label>
            <label>${msg('Phone Number')}
                <input name="phone" .value="${this.employee.phone || ''}" @input="${this._handleInputChange}" pattern="\\d{10,15}" required />
            </label>
            <label>${msg('Email Address')}
                <input type="email" name="email" .value="${this.employee.email || ''}" @input="${this._handleInputChange}" required />
            </label>
            <label>${msg('Department')}
            <select name="department" .value="${this.employee.department || ''}" @change="${this._handleInputChange}" required>
                <option value="">${msg('Select')}...</option>
                <option value="Analytics">${msg('Analytics')}</option>
                <option value="Tech">${msg('Tech')}</option>
            </select>
            </label>
            <label>${msg('Position')}
                <select name="position" .value="${this.employee.position || ''}" @change="${this._handleInputChange}" required>
                    <option value="">${msg('Select')}...</option>
                    <option value="Junior">${msg('Junior')}</option>
                    <option value="Medior">${msg('Medior')}</option>
                    <option value="Senior">${msg('Senior')}</option>
                </select>
            </label>
            <button type="submit">${isEdit ? msg('Update') : msg('Create')}</button>
        </form>
        `;
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this.employee = { ...this.employee, [name]: value };
  }

  _handleSubmit(e) {
    e.preventDefault();
    const isEdit = Boolean(this.employee && this.employee.id);
    // basic required check
    if (!this.employee.firstName || !this.employee.lastName || !this.employee.dateOfEmployment || !this.employee.dateOfBirth ||
      !this.employee.phone || !this.employee.email || !this.employee.department || !this.employee.position) {
      this.errorMessage = msg('Please fill in all fields.');
      return;
    }
    // email uniqueness check
    const exists = store.getState().employees?.find(emp => emp.email === this.employee.email && emp.id !== this.employee.id);
    if (exists) {
      this.errorMessage = msg('An employee with this email already exists.');
      return;
    }
    // dispatch new or update employee
    if (isEdit) {
      this.dispatchEvent(new CustomEvent('form-saved', {
        detail: { employee: this.employee },
        bubbles: true,
        composed: true
      }));
    } else {
      store.dispatch(addEmployee({ id: Date.now(), ...this.employee }));
    }
    Router.go('/employees');
  }
}
customElements.define('employee-form', EmployeeForm);