import { fixture, html, assert } from '@open-wc/testing';
import { EmployeeList } from '../components/employee-list.js';
import '../components/employee-list.js';

suite('employee-list', () => {
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
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('default pagination values', async () => {
    const el = await fixture(html`<employee-list .employees=${[]} ></employee-list>`);
    assert.equal(el.currentPage, 1, 'currentPage defaults to 1');
    assert.equal(el.itemsPerPage, 10, 'itemsPerPage defaults to 10');
    assert.equal(el.totalPages, 0, 'totalPages is 0 when no employees');
  });

  test('totalPages and paginatedEmployees logic', async () => {
    const el = await fixture(html`<employee-list .employees=${sampleEmployees}></employee-list>`);
    assert.equal(el.totalPages, 2, 'totalPages should be 2 for 15 items with 10 per page');
    // first page
    assert.equal(el.paginatedEmployees.length, 10, 'paginatedEmployees length for page 1 is 10');
    el.nextPage();
    await el.updateComplete;
    assert.equal(el.currentPage, 2, 'currentPage updates on nextPage()');
    assert.equal(el.paginatedEmployees.length, 5, 'paginatedEmployees length for page 2 is 5');
    el.previousPage();
    await el.updateComplete;
    assert.equal(el.currentPage, 1, 'currentPage updates on previousPage() back to 1');
    el.goToPage(2);
    await el.updateComplete;
    assert.equal(el.currentPage, 2, 'currentPage updates on goToPage(2)');
  });

  test('renders header row with correct columns', async () => {
    const el = await fixture(html`<employee-list .employees=${sampleEmployees}></employee-list>`);
    const headerCols = el.shadowRoot.querySelectorAll('li.list-item:first-child .list-title');
    const expected = ['First Name', 'Last Name', 'Date of Employment', 'Date of Birth', 'Phone', 'Email', 'Department', 'Position', 'Actions'];
    // skip the checkbox column
    const texts = Array.from(headerCols).slice(1).map(elm => elm.textContent.trim());
    assert.deepEqual(texts, expected, 'header titles match expected labels');
  });

  test('renders correct number of list items per page', async () => {
    const el = await fixture(html`<employee-list .employees=${sampleEmployees}></employee-list>`);
    await el.updateComplete;
    const itemsPage1 = el.shadowRoot.querySelectorAll('li.list-item');
    assert.equal(itemsPage1.length, 11, '1 header + 10 items on page 1');
    // go to page 2
    const nextBtn = el.shadowRoot.querySelector('.next-button');
    nextBtn.click();
    await el.updateComplete;
    const itemsPage2 = el.shadowRoot.querySelectorAll('li.list-item');
    assert.equal(itemsPage2.length, 6, '1 header + 5 items on page 2');
  });

  test('pagination buttons reflect current page and disable appropriately', async () => {
    const el = await fixture(html`<employee-list .employees=${sampleEmployees}></employee-list>`);
    await el.updateComplete;
    const prevBtn = el.shadowRoot.querySelector('.prev-button');
    const nextBtn = el.shadowRoot.querySelector('.next-button');
    assert.isTrue(prevBtn.hasAttribute('disabled'), 'prev-button disabled on first page');
    assert.isFalse(nextBtn.hasAttribute('disabled'), 'next-button enabled on first page');
    // go to last page
    el.goToPage(el.totalPages);
    await el.updateComplete;
    assert.isFalse(prevBtn.hasAttribute('disabled'), 'prev-button enabled on last page');
    assert.isTrue(nextBtn.hasAttribute('disabled'), 'next-button disabled on last page');
    // active page button
    const activeBtn = el.shadowRoot.querySelector('button.active');
    assert.equal(activeBtn.textContent.trim(), `${el.totalPages}`, 'active button label matches currentPage');
  });
});
