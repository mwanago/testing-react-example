import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { PostsList } from './views/PostsList';
import { Counter } from './views/Counter';
import { CreateCommentForm } from './views/CreateCommentForm';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/create-comment" element={<CreateCommentForm />} />
    </Routes>
  );
};
