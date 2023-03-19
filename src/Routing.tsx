import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { PostsList } from './views/PostsList';

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
  </Routes>)
}
