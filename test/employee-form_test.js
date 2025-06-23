import { fixture, html, assert, oneEvent } from '@open-wc/testing';
import '../components/employee-form.js';
import { EmployeeForm } from '../components/employee-form.js';

suite('employee-form', () => {
    test('is defined', () => {
        const el = document.createElement('employee-form');
        assert.instanceOf(el, EmployeeForm);
    });

    test('renders all input fields and correct button label for create mode', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);
        const labels = el.shadowRoot.querySelectorAll('label');
        assert.equal(labels.length, 8, 'renders 8 field labels');
        const btn = el.shadowRoot.querySelector('button[type="submit"]');
        assert.equal(btn.textContent.trim(), 'Create', 'button text should be Create');
    });

    test('input events update employee property', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);
        const input = el.shadowRoot.querySelector('input[name="firstName"]');
        input.value = 'Alice';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;
        assert.equal(el.employee.firstName, 'Alice', 'firstName property updates on input');
    });

    test('shows validation error when submitting empty form', async () => {
        const el = await fixture(html`<employee-form></employee-form>`);
        const form = el.shadowRoot.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await el.updateComplete;
        const error = el.shadowRoot.querySelector('.error');
        assert.ok(error, 'error message is displayed');
        assert.equal(el.errorMessage, 'Please fill in all fields.', 'errorMessage property is set');
    });

    test('renders Update button when in edit mode', async () => {
        const data = { id: '123', firstName: 'A', lastName: 'B', dateOfEmployment: '2025-01-01', dateOfBirth: '1990-01-01', phone: '1111111111', email: 'a@b.com', department: 'Tech', position: 'Junior' };
        const el = await fixture(html`<employee-form .employee=${data}></employee-form>`);
        await el.updateComplete;
        const btn = el.shadowRoot.querySelector('button[type="submit"]');
        assert.equal(btn.textContent.trim(), 'Update', 'button text should be Update in edit mode');
    });

    test('dispatches form-saved event with detail on valid edit submit', async () => {
        const data = { id: '123', firstName: 'A', lastName: 'B', dateOfEmployment: '2025-01-01', dateOfBirth: '1990-01-01', phone: '1111111111', email: 'a@b.com', department: 'Tech', position: 'Junior' };
        const el = await fixture(html`<employee-form .employee=${data}></employee-form>`);
        // listen for the event
        setTimeout(() => {
            const form = el.shadowRoot.querySelector('form');
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        });
        const ev = await oneEvent(el, 'form-saved');
        assert.deepEqual(ev.detail.employee, data, 'form-saved event detail should include the employee object');
    });
});
