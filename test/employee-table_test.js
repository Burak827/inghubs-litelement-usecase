import { fixture, html, assert } from '@open-wc/testing';
import '../components/employee-table.js';
import { EmployeeTable } from '../components/employee-table.js';

suite('employee-table', () => {
  const sampleEmployees = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    dateOfEmployment: `2025-01-${(i % 30) + 1}`.padStart(10, '0'),
    dateOfBirth: `1990-02-${(i % 28) + 1}`.padStart(10, '0'),
    phone: `12345678${i + 10}`,
    email: `user${i + 1}@test.com`,
    department: i % 2 === 0 ? 'Analytics' : 'Tech',
    position: ['Junior', 'Medior', 'Senior'][i % 3]
  }));

  test('is defined', () => {
    const el = document.createElement('employee-table');
    assert.instanceOf(el, EmployeeTable);
  });

  test('default pagination values', async () => {
    const el = await fixture(html`<employee-table .employees=${[]}></employee-table>`);
    assert.equal(el.currentPage, 1, 'currentPage defaults to 1');
    assert.equal(el.itemsPerPage, 10, 'itemsPerPage defaults to 10');
    assert.equal(el.totalPages, 0, 'totalPages is 0 when no employees');
  });

  test('totalPages and paginatedEmployees logic', async () => {
    const el = await fixture(html`<employee-table .employees=${sampleEmployees}></employee-table>`);
    assert.equal(el.totalPages, 2, 'totalPages should be 2 for 15 items');
    // page 1
    assert.equal(el.paginatedEmployees.length, 10, 'paginatedEmployees length on page 1 is 10');
    el.nextPage();
    await el.updateComplete;
    assert.equal(el.currentPage, 2, 'currentPage increments with nextPage()');
    assert.equal(el.paginatedEmployees.length, 5, 'paginatedEmployees length on page 2 is 5');
    el.previousPage();
    await el.updateComplete;
    assert.equal(el.currentPage, 1, 'currentPage decrements with previousPage()');
    el.goToPage(2);
    await el.updateComplete;
    assert.equal(el.currentPage, 2, 'currentPage sets correctly with goToPage(2)');
  });

  test('renders table header with correct titles', async () => {
    const el = await fixture(html`<employee-table .employees=${sampleEmployees}></employee-table>`);
    const headers = el.shadowRoot.querySelectorAll('th.list-column.list-title');
    // Skip the first checkbox header
    const titles = Array.from(headers).slice(1).map(h => h.textContent.trim());
    const expected = ['First Name', 'Last Name', 'Date of Employment', 'Date of Birth', 'Phone', 'Email', 'Department', 'Position', 'Actions'];
    assert.deepEqual(titles, expected, 'table header titles match expected labels');
  });

  test('renders correct number of rows per page', async () => {
    const el = await fixture(html`<employee-table .employees=${sampleEmployees}></employee-table>`);
    await el.updateComplete;
    const rowsPage1 = el.shadowRoot.querySelectorAll('tbody tr');
    assert.equal(rowsPage1.length, 10, '10 rows rendered on first page');
    // Navigate to page 2
    const buttons = el.shadowRoot.querySelectorAll('.pagination button');
    buttons[2].click(); // click page 2 button
    await el.updateComplete;
    const rowsPage2 = el.shadowRoot.querySelectorAll('tbody tr');
    assert.equal(rowsPage2.length, 5, '5 rows rendered on second page');
  });

  test('pagination buttons reflect disabled and active states', async () => {
    const el = await fixture(html`<employee-table .employees=${sampleEmployees}></employee-table>`);
    await el.updateComplete;
    const buttons = el.shadowRoot.querySelectorAll('.pagination button');
    const prevBtn = buttons[0];
    const page1Btn = buttons[1];
    const page2Btn = buttons[2];
    const nextBtn = buttons[3];

    assert.isTrue(prevBtn.hasAttribute('disabled'), 'prev-button disabled on first page');
    assert.isFalse(nextBtn.hasAttribute('disabled'), 'next-button enabled on first page');
    assert.isTrue(page1Btn.classList.contains('active'), 'page1 button has active class');

    // go to page 2
    page2Btn.click();
    await el.updateComplete;
    assert.isFalse(prevBtn.hasAttribute('disabled'), 'prev-button enabled on second page');
    assert.isTrue(nextBtn.hasAttribute('disabled'), 'next-button disabled on last page');
    assert.isTrue(page2Btn.classList.contains('active'), 'page2 button has active class');
  });
});
