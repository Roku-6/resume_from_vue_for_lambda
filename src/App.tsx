import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from './view/HomeView';
import ProfileEdit from './view/ProfileEdit';
import NotFound from './view/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="ProfileEdit" element={<ProfileEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;