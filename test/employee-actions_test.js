import { fixture, html, assert } from '@open-wc/testing';
import { EmployeeActions } from '../components/employee-actions.js';
import '../components/employee-actions.js';

suite('employee-actions', () => {
  test('is defined', () => {
    const el = document.createElement('employee-actions');
    assert.instanceOf(el, EmployeeActions);
  });

  test('renders action container and buttons', async () => {
    const el = await fixture(html`<employee-actions id="abc"></employee-actions>`);
    const actions = el.shadowRoot.querySelector('.actions');
    assert.ok(actions, 'should render .actions container');
    const editBtn = el.shadowRoot.querySelector('.edit-button');
    const deleteBtn = el.shadowRoot.querySelector('.delete-button');
    assert.ok(editBtn, 'should render edit-button');
    assert.ok(deleteBtn, 'should render delete-button');
  });

  test('actions container uses flex layout', async () => {
    const el = await fixture(html`<employee-actions></employee-actions>`);
    const actions = el.shadowRoot.querySelector('.actions');
    const style = getComputedStyle(actions);
    assert.equal(style.display, 'flex', 'actions container should use flex display');
  });

  test('clicking edit-button dispatches edit-request with correct detail', async () => {
    const el = await fixture(html`<employee-actions id="xyz"></employee-actions>`);
    let eventDetail = null;
    el.addEventListener('edit-request', e => { eventDetail = e.detail; });
    const editBtn = el.shadowRoot.querySelector('.edit-button');
    editBtn.click();
    await el.updateComplete;
    assert.deepEqual(eventDetail, { id: 'xyz' }, 'edit-request detail should contain id');
  });

  test('clicking delete-button dispatches delete-request with correct detail', async () => {
    const el = await fixture(html`<employee-actions id="1234"></employee-actions>`);
    let eventDetail = null;
    el.addEventListener('delete-request', e => { eventDetail = e.detail; });
    const deleteBtn = el.shadowRoot.querySelector('.delete-button');
    deleteBtn.click();
    await el.updateComplete;
    assert.deepEqual(eventDetail, { id: '1234' }, 'delete-request detail should contain id');
  });
});
