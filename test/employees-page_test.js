import { fixture, assert, html } from '@open-wc/testing';
import { EmployeesPage } from '../components/employees-page.js';

suite('employees-page', () => {
  test('is defined', () => {
    const el = document.createElement('employees-page');
    assert.instanceOf(el, EmployeesPage);
  });

  test('renders confirmation-dialog and employee-edit-dialog based on flags', async () => {
    const el = await fixture(html`<employees-page></employees-page>`);
    // confirmation dialog
    el.deleteDialogOpen = true;
    await el.updateComplete;
    const confirmDlg = el.shadowRoot.querySelector('confirmation-dialog');
    assert.ok(confirmDlg, 'confirmation-dialog should be in DOM when deleteDialogOpen is true');
    // edit dialog
    el.editDialogOpen = true;
    await el.updateComplete;
    const editDlg = el.shadowRoot.querySelector('employee-edit-dialog');
    assert.ok(editDlg, 'employee-edit-dialog should be in DOM when editDialogOpen is true');
  });
  
});
