import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { PostsList } from './views/PostsList';
import { Counter } from './views/Counter';

export const Routing = () => {
  return (<Routes>
    <Route
      path='/'
      element={<Home />}
    />
    <Route
      path='/posts'
      element={<PostsList />}
    />
    <Route
      path='/counter'
      element={<Counter />}
    />
  </Routes>)
}
