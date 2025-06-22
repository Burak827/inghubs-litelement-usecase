import { LitElement, html, css } from 'lit';
import './app-navbar.js';
import { Router } from '@vaadin/router';
import { store } from '../redux/store.js';
import { addEmployee } from '../redux/employeeSlice.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

export class EmployeeForm extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }
    form {
      display: grid;
      grid-gap: 1rem;
      background: #f9f9f9;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
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
  `;
  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    employmentDate: { type: String },
    birthDate: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String },
    department: { type: String },
    position: { type: String },
    errorMessage: { type: String }
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.firstName = '';
    this.lastName = '';
    this.employmentDate = '';
    this.birthDate = '';
    this.phoneNumber = '';
    this.emailAddress = '';
    this.department = '';
    this.position = '';
    this.errorMessage = '';
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <h1> ${msg('New Employee')}</h1>
      <form @submit="${this._handleSubmit}">
        ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
        <label>${msg('First Name')}
          <input name="firstName" .value="${this.firstName}" @input="${this._handleInputChange}" required />
        </label>
        <label>${msg('Last Name')}
          <input name="lastName" .value="${this.lastName}" @input="${this._handleInputChange}" required />
        </label>
        <label>${msg('Date of Employment')}
          <input type="date" name="employmentDate" .value="${this.employmentDate}" @input="${this._handleInputChange}" required />
        </label>
        <label>${msg('Date of Birth')}
          <input type="date" name="birthDate" .value="${this.birthDate}" @input="${this._handleInputChange}" required />
        </label>
        <label>${msg('Phone Number')}
          <input name="phoneNumber" .value="${this.phoneNumber}" @input="${this._handleInputChange}" pattern="\\d{10,15}" required />
        </label>
        <label>${msg('Email Address')}
          <input type="email" name="emailAddress" .value="${this.emailAddress}" @input="${this._handleInputChange}" required />
        </label>
        <label>${msg('Department')}
          <select name="department" .value="${this.department}" @change="${this._handleInputChange}" required>
            <option value="">${msg('Select')}...</option>
            <option value="Analytics">${msg('Analytics')}</option>
            <option value="Tech">${msg('Tech')}</option>
          </select>
        </label>
        <label>${msg('Position')}
          <select name="position" .value="${this.position}" @change="${this._handleInputChange}" required>
            <option value="">${msg('Select')}...</option>
            <option value="Junior">${msg('Junior')}</option>
            <option value="Medior">${msg('Medior')}</option>
            <option value="Senior">${msg('Senior')}</option>
          </select>
        </label>
        <button type="submit">${msg('Create')}</button>
      </form>
    `;
  }

  _handleInputChange(e) {
    const { name, value } = e.target;
    this[name] = value;
  }

  _handleSubmit(e) {
    e.preventDefault();
    // basic required check
    if (!this.firstName || !this.lastName || !this.employmentDate || !this.birthDate ||
      !this.phoneNumber || !this.emailAddress || !this.department || !this.position) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    // email uniqueness check
    const exists = store.getState().employees?.find(emp => emp.emailAddress === this.emailAddress);
    if (exists) {
      this.errorMessage = 'An employee with this email already exists.';
      return;
    }
    // dispatch new employee
    store.dispatch(addEmployee({
      id: Date.now(),
      firstName: this.firstName,
      lastName: this.lastName,
      employmentDate: this.employmentDate,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      department: this.department,
      position: this.position
    }));
    Router.go('/employees');
  }
}
customElements.define('employee-form', EmployeeForm);