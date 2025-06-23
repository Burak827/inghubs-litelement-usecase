// import { fixture, html, assert, oneEvent } from '@open-wc/testing';
// import { EmployeeForm } from '../components/employee-form.js';
// import '../components/employee-form.js';
// import { store } from '../redux/store.js';

// suite('employee-form', () => {
//   let originalDispatch;
//   let originalGetState;

//   setup(() => {
//     // stub store methods
//     originalDispatch = store.dispatch;
//     originalGetState = store.getState;
//     store.dispatch = (action) => { originalDispatch(action); };
//     store.getState = () => ({ employees: [] });
//   });

//   teardown(() => {
//     store.dispatch = originalDispatch;
//     store.getState = originalGetState;
//   });

//   test('is defined', () => {
//     const el = document.createElement('employee-form');
//     assert.instanceOf(el, EmployeeForm);
//   });

//   test('renders all input fields and create button when no employee id', async () => {
//     const el = await fixture(html`<employee-form></employee-form>`);
//     const labels = el.shadowRoot.querySelectorAll('label');
//     assert.equal(labels.length, 8, 'should render 8 labels for each field');
//     const btn = el.shadowRoot.querySelector('button[type="submit"]');
//     assert.equal(btn.textContent.trim(), 'Create', 'button text should be Create');
//   });

//   test('input change updates employee property', async () => {
//     const el = await fixture(html`<employee-form></employee-form>`);
//     const input = el.shadowRoot.querySelector('input[name="firstName"]');
//     input.value = 'Jane';
//     input.dispatchEvent(new Event('input'));
//     await el.updateComplete;
//     assert.equal(el.employee.firstName, 'Jane', 'firstName should update on input');
//   });

//   test('shows errorMessage when submitting empty form', async () => {
//     const el = await fixture(html`<employee-form></employee-form>`);
//     const form = el.shadowRoot.querySelector('form');
//     form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
//     await el.updateComplete;
//     assert.equal(el.errorMessage, 'Please fill in all fields.', 'errorMessage set for missing fields');
//     const errorEl = el.shadowRoot.querySelector('.error');
//     assert.ok(errorEl, 'error div should be rendered');
//   });

//   test('shows duplicate email error', async () => {
//     const el = await fixture(html`<employee-form></employee-form>`);
//     // populate fields
//     el.employee = {
//       id: '', firstName: 'A', lastName: 'B', dateOfEmployment: '2025-01-01',
//       dateOfBirth: '1990-01-01', phone: '1234567890', email: 'dup@test.com',
//       department: 'Tech', position: 'Junior'
//     };
//     // stub duplicate in store
//     store.getState = () => ({ employees: [{ id: 'other', email: 'dup@test.com' }] });
//     const form = el.shadowRoot.querySelector('form');
//     form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
//     await el.updateComplete;
//     assert.equal(el.errorMessage, 'An employee with this email already exists.', 'errorMessage set for duplicate email');
//   });

//   test('renders update button when editing existing employee', async () => {
//     const data = {
//       id: '1', firstName: 'X', lastName: 'Y', dateOfEmployment: '2025-01-01',
//       dateOfBirth: '1990-01-01', phone: '1111111111', email: 'x@y.com', department: 'Analytics', position: 'Medior'
//     };
//     const el = await fixture(html`<employee-form .employee=${data}></employee-form>`);
//     const btn = el.shadowRoot.querySelector('button[type="submit"]');
//     assert.equal(btn.textContent.trim(), 'Update', 'button text should be Update for edit mode');
//   });

//   test('dispatches form-saved event on edit and navigates', async () => {
//     const data = {
//       id: '1', firstName: 'X', lastName: 'Y', dateOfEmployment: '2025-01-01',
//       dateOfBirth: '1990-01-01', phone: '1111111111', email: 'unique2@test.com', department: 'Analytics', position: 'Medior'
//     };
//     const el = await fixture(html`<employee-form .employee=${data}></employee-form>`);
//     setTimeout(() => {
//       const formEl = el.shadowRoot.querySelector('form');
//       formEl.dispatchEvent(new CustomEvent('save', { detail: { employee: data }, bubbles: true, composed: true }));
//     });
//     const ev = await oneEvent(el, 'form-saved');
//     assert.deepEqual(ev.detail.employee, data, 'form-saved event detail should match');
//   });
// });
