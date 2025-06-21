import { LitElement, html, css } from 'lit';

export class AppNavbar extends LitElement {
  static styles = css``;

  render() {
    return html`
      <nav>
        <a href="/employees" data-link>employees</a>
        <a href="/employees/new" data-link>+ 'addNew'</a>
      </nav>
    `;
  }

}
customElements.define('app-navbar', AppNavbar);