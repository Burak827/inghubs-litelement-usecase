import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';
import { getLocale, setLocale } from '../localization';

export class AppNavbar extends LitElement {
  static properties = {
    classes: { type: Object }
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    if (getLocale() === 'tr') {
      this.classes = { flagtr: true, flaguk: false };
    } else {
      this.classes = { flagtr: false, flaguk: true };
    }
  }

  static get styles() {
    return css`
      .navbar { 
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FFF;
        height: 3rem;
      }

      .logo-container { 
        display: flex;
        height: 100%;
        align-items: center;
        padding-left: 1rem;
      }

      .logo { 
        background-image: url("/assets/logo.svg");
        background-size: contain;
        background-repeat: no-repeat;
        height: 1.8rem;
        width: 1.8rem;        
      }

      .nav-buttons {
        display: flex;
        align-items: center;
        height: 100%;
        padding-right: 1rem;
        gap: 1rem;
      }

      .right-section {
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: flex-end;
        margin-right: 1rem;
      }

      .title {
        margin-left: 1rem;
        font-family: sans-serif;
        font-size: large;
      }

      .nav-button {
        color: #FF784F;
        text-decoration: none;
        cursor: pointer;
        font-family: sans-serif;
      }

      .language-switcher {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .flagtr{
          background-image: url(/assets/tr.svg);
          background-size: contain;
          background-repeat: no-repeat;
          margin-top: 0.5rem;
          width: 1.4rem;
          height: 1.4rem;
        }

        .flaguk{
          background-image: url(/assets/uk.svg);
          background-size: contain;
          background-repeat: no-repeat;
          margin-top: 0.7rem;
          width: 1.4rem;
          height: 1.4rem;
        }
      }

      .employees::before {
        content: '';
        -webkit-mask: url(/assets/icons/employees.svg) no-repeat 50% 50%;
        mask: url(/assets/icons/employees.svg) no-repeat 50% 50%;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: #FF784F;
        display: inline-block;
        width: 1.3rem;   
        height: 1.3rem;
        margin-right: 0.3rem;
        vertical-align: middle;
      }

      .add-new::before {
        content: '';
        -webkit-mask: url(/assets/icons/add.svg) no-repeat 50% 50%;
        mask: url(/assets/icons/add.svg) no-repeat 50% 50%;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: #FF784F;
        display: inline-block;
        width: 1.5rem;   
        height: 1.5rem;
        vertical-align: middle;
      }
    `;
  }

  render() {
    return html`
      <header class="navbar">
        <div class="logo-container">
          <div class="logo"></div>
          <span class="title">ING</span>
        </div>
        <div class="right-section">
          <nav class="nav-buttons">
            <a class="nav-button employees">${msg('Employees')}</a>
            <a class="nav-button add-new">${msg('Add New')}</a>
          </nav>
          <div class="language-switcher" @click="${this._switchLanguage}">
            <span class=${classMap(this.classes)}></span>
          </div>
        </div>
      </header>
    `;
  }

  _switchLanguage() {
    if (this.classes.flagtr) {
      this.classes = { flagtr: false, flaguk: true };
      setLocale('en');
    } else {
      this.classes = { flagtr: true, flaguk: false };
      setLocale('tr');
    }
  }
}
customElements.define('app-navbar', AppNavbar);