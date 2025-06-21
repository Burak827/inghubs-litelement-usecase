import { LitElement, html, css } from 'lit';
import './app-navbar.js';
export class EmployeeForm extends LitElement {
  static styles = css``;
  constructor() {
    super();
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <h1>Employee Form</h1>
    `;
  }
}
customElements.define('employee-form', EmployeeForm);