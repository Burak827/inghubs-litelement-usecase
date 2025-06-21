import { LitElement, html, css } from 'lit';
import './app-navbar.js';

export class AppRoot extends LitElement {
  static styles = css``;

  render() {
    return html`
      <app-navbar></app-navbar>
      <div id="outlet"></div>
    `;
  }
}
customElements.define('app-root', AppRoot);
