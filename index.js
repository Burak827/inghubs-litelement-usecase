import { Router } from '@vaadin/router';
import './redux/store.js';
import './components/app-navbar.js';
import './components/employees-page.js';
import './components/add-new-page.js';
import './localization.js';

const outlet = document.body.querySelector('app-root');
const router = new Router(outlet);
router.setRoutes([
    { path: '/', redirect: '/employees' },
    { path: '/employees', component: 'employees-page' },
    { path: '/employees/new', component: 'add-new-page' },
]);

window.router = router;