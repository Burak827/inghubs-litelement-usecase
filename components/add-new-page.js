import { LitElement, html, css } from 'lit';
import './app-navbar.js';
import './employee-form.js';
import { Router } from '@vaadin/router';
import { store } from '../redux/store.js';
import { addEmployee } from '../redux/employeeSlice.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

export class AddNewPage extends LitElement {
    static styles = css`
        .container {
            font-family: sans-serif;
        }
        
        .title {
            color:#FF784F;
            font-size: 1.6rem;
            font-weight: 400;
        }

        .content {
            display: flex;
            flex: 1;
            justify-content: center;
        }
    `;

    constructor() {
        super();
        updateWhenLocaleChanges(this);
    }

    render() {
        return html`
        <div class="container">
            <app-navbar></app-navbar>
            <div class="header">
                <h1 class="title">${msg('New Employee')}</h1>
            </div>
            <div class="content">
                <employee-form></employee-form>
            </div>
        </div>
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
            this.errorMessage = msg('Please fill in all fields.');
            return;
        }
        // email uniqueness check
        const exists = store.getState().employees?.find(emp => emp.emailAddress === this.emailAddress);
        if (exists) {
            this.errorMessage = msg('An employee with this email already exists.');
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
customElements.define('add-new-page', AddNewPage);