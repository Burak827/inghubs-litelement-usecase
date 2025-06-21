import { Router } from '@vaadin/router';
import './store.js';
import './components/app-root.js';
import './components/app-navbar.js';
import './components/employee-list.js';
import './components/employee-form.js';

const outlet = document.body.querySelector('app-root').shadowRoot.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([
    { path: '/', redirect: '/employees' },
    { path: '/employees', component: 'employee-list' },
    { path: '/employees/new', component: 'employee-form' },
    { path: '/employees/:id/edit', component: 'employee-form' },
]);
window.router = router;