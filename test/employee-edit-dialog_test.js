import { fixture, html, assert, oneEvent } from '@open-wc/testing';
import { EmployeeEditDialog } from '../components/employee-edit-dialog.js';
import '../components/employee-edit-dialog.js';
import '../components/employee-form.js';

suite('employee-edit-dialog', () => {
  test('is defined', () => {
    const el = document.createElement('employee-edit-dialog');
    assert.instanceOf(el, EmployeeEditDialog);
  });

  test('default properties', async () => {
    const el = await fixture(html`<employee-edit-dialog></employee-edit-dialog>`);
    assert.isFalse(el.open, 'open should default to false');
    assert.isUndefined(el.employee, 'employee should be undefined by default');
  });

  test('reflects open as attribute and controls visibility', async () => {
    const el = await fixture(html`<employee-edit-dialog></employee-edit-dialog>`);
    el.open = true;
    await el.updateComplete;
    assert.isTrue(el.hasAttribute('open'), 'should reflect open attribute when true');
    const styleVisible = getComputedStyle(el).display;
    assert.equal(styleVisible, 'flex', 'dialog should display flex when open');
    el.open = false;
    await el.updateComplete;
    assert.isFalse(el.hasAttribute('open'), 'should remove open attribute when false');
    const styleHidden = getComputedStyle(el).display;
    assert.equal(styleHidden, 'none', 'dialog should be hidden when not open');
  });

  test('renders employee-form with the provided employee object', async () => {
    const data = { id: '1', firstName: 'Alice' };
    const el = await fixture(html`<employee-edit-dialog .employee=${data} open></employee-edit-dialog>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('employee-form');
    assert.ok(form, 'employee-form should be rendered');
    assert.deepEqual(form.employee, data, 'employee-form.employee should match the passed object');
  });

  test('clicking close button dispatches form-cancelled and closes dialog', async () => {
    const el = await fixture(html`<employee-edit-dialog open></employee-edit-dialog>`);
    setTimeout(() => el.shadowRoot.querySelector('.close-button').click());
    const ev = await oneEvent(el, 'form-cancelled');
    assert.ok(ev, 'form-cancelled event should fire');
    await el.updateComplete;
    assert.isFalse(el.open, 'dialog should close after cancel');
  });

  test('clicking backdrop (host) dispatches form-cancelled and closes dialog', async () => {
    const el = await fixture(html`<employee-edit-dialog open></employee-edit-dialog>`);
    setTimeout(() => el.click());
    const ev = await oneEvent(el, 'form-cancelled');
    assert.ok(ev, 'form-cancelled event should fire on backdrop click');
    await el.updateComplete;
    assert.isFalse(el.open, 'dialog should close after backdrop click');
  });

  test('receives save from form and dispatches form-saved with detail, then closes', async () => {
    const detailData = { foo: 'bar' };
    const el = await fixture(html`<employee-edit-dialog open></employee-edit-dialog>`);
    const form = el.shadowRoot.querySelector('employee-form');
    setTimeout(() => {
      form.dispatchEvent(new CustomEvent('save', {
        detail: detailData,
        bubbles: true,
        composed: true
      }));
    });
    const ev = await oneEvent(el, 'form-saved');
    assert.deepEqual(ev.detail, detailData, 'form-saved event detail should match');
    await el.updateComplete;
    assert.isFalse(el.open, 'dialog should close after save');
  });
});
