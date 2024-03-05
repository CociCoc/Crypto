import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(router());