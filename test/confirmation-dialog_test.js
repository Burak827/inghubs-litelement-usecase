import { fixture, html, assert } from '@open-wc/testing';
import { ConfirmationDialog } from '../components/confirmation-dialog.js';
import '../components/confirmation-dialog.js';

suite('confirmation-dialog', () => {
  test('is defined', () => {
    const el = document.createElement('confirmation-dialog');
    assert.instanceOf(el, ConfirmationDialog);
  });

  test('default properties', async () => {
    const el = await fixture(html`<confirmation-dialog></confirmation-dialog>`);
    assert.isFalse(el.open, 'open should be false by default');
    assert.equal(el.title, '', 'title should be empty string by default');
    assert.equal(el.message, '', 'message should be empty string by default');
  });

  test('reflects open property as attribute', async () => {
    const el = await fixture(html`<confirmation-dialog></confirmation-dialog>`);
    el.open = true;
    await el.updateComplete;
    assert.isTrue(el.hasAttribute('open'), 'open attribute should be present when property is true');
    el.open = false;
    await el.updateComplete;
    assert.isFalse(el.hasAttribute('open'), 'open attribute should be removed when property is false');
  });

  test('renders title and message content', async () => {
    const el = await fixture(html`
      <confirmation-dialog open title="Delete Item" message="Are you sure?"></confirmation-dialog>
    `);
    const header = el.shadowRoot.querySelector('.header');
    const body = el.shadowRoot.querySelector('.body');
    assert.equal(header.textContent.trim(), 'Delete Item', 'header displays title property');
    assert.equal(body.textContent.trim(), 'Are you sure?', 'body displays message property');
  });

  test('clicking confirm button dispatches event and closes dialog', async () => {
    const el = await fixture(html`<confirmation-dialog open></confirmation-dialog>`);
    let fired = false;
    el.addEventListener('confirm-delete', () => fired = true);
    const btn = el.shadowRoot.querySelector('.btn.confirm');
    btn.click();
    await el.updateComplete;
    assert.isTrue(fired, 'confirm-delete event should be fired');
    assert.isFalse(el.open, 'dialog should close (open=false) after confirm');
  });

  test('clicking cancel button dispatches event and closes dialog', async () => {
    const el = await fixture(html`<confirmation-dialog open></confirmation-dialog>`);
    let fired = false;
    el.addEventListener('cancel-delete', () => fired = true);
    const btn = el.shadowRoot.querySelector('.btn.cancel');
    btn.click();
    await el.updateComplete;
    assert.isTrue(fired, 'cancel-delete event should be fired');
    assert.isFalse(el.open, 'dialog should close (open=false) after cancel');
  });
});
