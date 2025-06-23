import { store } from '../redux/store.js';
import { fixture, html, assert } from '@open-wc/testing';
import { AddNewPage } from '../components/add-new-page.js';
import '../components/add-new-page.js';

suite('add-new-page', () => {
  test('is defined', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    assert.instanceOf(el, AddNewPage, 'Element should be an instance of AddNewPage');
  });

  test('renders app-navbar and header title', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    const navbar = el.shadowRoot.querySelector('app-navbar');
    assert.ok(navbar, 'app-navbar is rendered');
    const titleEl = el.shadowRoot.querySelector('.title');
    assert.equal(titleEl.textContent.trim(), 'New Employee', 'Header title should be "New Employee"');
  });

  test('renders employee-form in content area', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    const form = el.shadowRoot.querySelector('employee-form');
    assert.ok(form, 'employee-form is rendered inside content');
  });

  test('container element exists with correct class', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    const container = el.shadowRoot.querySelector('.container');
    assert.ok(container, 'Container div with class "container" should be present');
  });

  test('content area is a flex container', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    const content = el.shadowRoot.querySelector('.content');
    const style = getComputedStyle(content);
    assert.equal(style.display, 'flex', 'Content area should use flex layout');
  });

  test('handleSubmit sets errorMessage when fields are missing', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    // simulate submit with missing fields
    const fakeEvent = { preventDefault: () => { } };
    el._handleSubmit(fakeEvent);
    assert.equal(
      el.errorMessage,
      'Please fill in all fields.',
      'errorMessage should be set when required fields are missing'
    );
  });

  test('handleSubmit sets errorMessage on duplicate email', async () => {
    const el = await fixture(html`<add-new-page></add-new-page>`);
    // populate all required fields
    el.firstName = 'John';
    el.lastName = 'Doe';
    el.employmentDate = '2025-01-01';
    el.birthDate = '1990-01-01';
    el.phoneNumber = '1234567890';
    el.emailAddress = 'duplicate@example.com';
    el.department = 'Tech';
    el.position = 'Junior';
    // stub store state to include duplicate email
    store.getState = () => ({ employees: [{ emailAddress: 'duplicate@example.com' }] });
    const fakeEvent = { preventDefault: () => { } };
    el._handleSubmit(fakeEvent);
    assert.equal(
      el.errorMessage,
      'An employee with this email already exists.',
      'errorMessage should be set when email is duplicate'
    );
  });
});
