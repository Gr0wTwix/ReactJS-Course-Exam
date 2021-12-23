import { Fragment } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Signup from './pages/Signup';
import Shoes from './pages/Shoes';
import MainHeader from './ui/MainHeader';
import Create from './pages/Create';
import UserCard from "./ui/userCards";
import Footer from "./components/Footer";

function App() {
  const { isLoggedIn } = useSelector(state => state);

  let routes;
  if (!isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Signup/>} />
      </Routes>
    )
  } else {
    routes = (
      <Fragment>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Shoes />} />
          <Route path="/create" element={<Create />} />
          <Route path="/people" element={<UserCard />} />
        </Routes>
        <Footer/>
      </Fragment>
    )
  }

  return (
    <Router>
        {routes}
    </Router>
  );
}

export default App;
