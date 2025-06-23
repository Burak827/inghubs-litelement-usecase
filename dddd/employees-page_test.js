import { AppNavbar } from '../components/app-navbar.js';
import { fixture, assert, html } from '@open-wc/testing';

suite('app-navbar', () => {
  test('is defined', () => {
    const el = document.createElement('app-navbar');
    assert.instanceOf(el, AppNavbar);
  });

  test('renders default logo and title', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const logoContainer = el.shadowRoot.querySelector('.logo-container');
    assert.ok(logoContainer, 'logo-container is rendered');
    const title = el.shadowRoot.querySelector('.title');
    assert.equal(title.textContent.trim(), 'ING', 'default title text');
  });

  test('navbar uses flex layout', async () => {
    const el = await fixture(html`<app-navbar></app-navbar>`);
    const navbar = el.shadowRoot.querySelector('.navbar');
    const style = getComputedStyle(navbar);
    assert.equal(style.display, 'flex', 'navbar is flex container');
  });
});
