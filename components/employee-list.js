import { LitElement, html, css } from 'lit';
import './app-navbar.js';

export class EmployeeList extends LitElement {
    static styles = css``;

    constructor() {
        super();
    }

    render() {
        return html`
        <app-navbar></app-navbar>
        <h1>Employee List</h1>`;
    }

}
customElements.define('employee-list', EmployeeList);