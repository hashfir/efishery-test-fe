import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  Dashboard,
  Login,
  MainLayout
} from './pages';

import { getArea, getSize } from './services/Api';
const fetchData = async () => {
  const dt = await getArea();
  const dt2 = await getSize();
  const dataRemaps = dt.filter(elem=> elem.city !== null).map(el=>({
    label: `${el.province}-${el.city}`,
    value:`${el.province}-${el.city}`
  }));
  const data2Remaps = dt2.map(el=>({
    label: el.size,
    value: el.size
  }));

  return {area:dataRemaps,size:data2Remaps};
};
const router = createBrowserRouter([
  {
    path: '/home',
    element: <MainLayout header="Dashboard" />,
    children: [
      {
        path: 'dashboard/',
        loader: fetchData,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Navigate replace to="/home/dashboard" />
  }
]);

export default router;
