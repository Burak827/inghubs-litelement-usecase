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

  firstUpdated() {
    this.shadowRoot.querySelectorAll('a[data-link]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const href = a.getAttribute('href');
        window.router.render(href);
        window.history.pushState({}, '', href);
      });
    });
  }
}
customElements.define('app-navbar', AppNavbar);