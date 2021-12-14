import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import Box from '@mui/material/Box';

import TwitterListTable from './twitterTable';
import useMounted from './useMounted';

import axios from "axios";

/*
const customers = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    city: 'Cleveland',
    country: 'USA',
    currency: '$',
    email: 'carson.darrin@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Carson Darrin',
    state: 'Ohio',
    totalAmountSpent: 300.00,
    totalOrders: 3,
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
    city: 'Atlanta',
    country: 'USA',
    currency: '$',
    email: 'fran.perez@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Fran Perez',
    state: 'Georgia',
    totalAmountSpent: 0.00,
    totalOrders: 0,
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
    city: 'North Canton',
    country: 'USA',
    currency: '$',
    email: 'jie.yan.song@devias.io',
    hasAcceptedMarketing: false,
    isProspect: false,
    isReturning: false,
    name: 'Jie Yan Song',
    state: 'Ohio',
    totalAmountSpent: 5600.00,
    totalOrders: 6,
  },
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
    city: 'Madrid',
    country: 'Spain',
    currency: '$',
    email: 'jane.rotanson@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Jane Rotanson',
    state: 'Madrid',
    totalAmountSpent: 500.00,
    totalOrders: 1,
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/static/mock-images/avatars/avatar-miron_vitold.png',
    city: 'San Diego',
    country: 'USA',
    currency: '$',
    email: 'miron.vitold@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Miron Vitold',
    totalAmountSpent: 0.00,
    totalOrders: 0,
    state: 'California',
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/static/mock-images/avatars/avatar-penjani_inyene.png',
    city: 'Berkeley',
    country: 'USA',
    currency: '$',
    email: 'penjani.inyene@devias.io',
    hasAcceptedMarketing: false,
    isProspect: true,
    isReturning: false,
    name: 'Penjani Inyene',
    state: 'California',
    totalAmountSpent: 0.00,
    totalOrders: 0,
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    avatar: '/static/mock-images/avatars/avatar-omar_darobe.png',
    currency: '$',
    email: 'omar.darobe@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: false,
    city: 'Carson City',
    country: 'USA',
    name: 'Omar Darobe',
    state: 'Nevada',
    totalAmountSpent: 100.00,
    totalOrders: 4,
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    avatar: '/static/mock-images/avatars/avatar-siegbert_gottfried.png',
    city: 'Los Angeles',
    country: 'USA',
    currency: '$',
    email: 'siegbert.gottfried@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Siegbert Gottfried',
    state: 'California',
    totalAmountSpent: 1000.00,
    totalOrders: 2,
  },
  {
    id: '5e8877da9a65442b11551975',
    avatar: '/static/mock-images/avatars/avatar-iulia_albu.png',
    city: 'Murray',
    country: 'USA',
    email: 'iulia.albu@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Iulia Albu',
    state: 'Utah',
    totalAmountSpent: 0.00,
    totalOrders: 0,
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    avatar: '/static/mock-images/avatars/avatar-nasimiyu_danai.png',
    city: 'Salt Lake City',
    country: 'USA',
    currency: '$',
    email: 'nasimiyu.danai@devias.io',
    hasAcceptedMarketing: false,
    isProspect: false,
    isReturning: true,
    name: 'Nasimiyu Danai',
    state: 'Utah',
    totalAmountSpent: 200.00,
    totalOrders: 7,
  }
];
*/
  

function App() {
  
  return (
    <div className="App">
      <h3>Twitter dashboard</h3>
      <Box sx={{m: 10}}>
        <TwitterListTable />  
      </Box>
    </div>
  );
}

export default App;
