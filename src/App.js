import './style/reset.css';
import './style/fonts.css';
import Auth from './pages/auth/Auth';
import Setup from 'pages/setup/Setup';
import Edit from "pages/edit/Edit";
import Profile from 'pages/profile/Profile';
import Feed from 'pages/feed/Feed';
import NotFound from "pages/notfound/NotFound";
import { Route, Routes } from "react-router-dom";
import {
  AUTH_ROUTE,
  SETUP_ROUTE,
  EDIT_ROUTE,
  PROFILE_ROUTE,
  FEED_ROUTE,
  NOT_FOUND,
} from "./utils/constants";
import PrivateRoute from 'services/PrivateRoutes';


function App() {
  return (
    <Routes>
      <Route path={AUTH_ROUTE} element={<Auth />} />
      <Route path={SETUP_ROUTE} element={<PrivateRoute component={Setup} />} />
      <Route path={EDIT_ROUTE} element={<PrivateRoute component={Edit} />} />
      <Route path={FEED_ROUTE} element={<PrivateRoute component={Feed} />} />
      <Route
        path={PROFILE_ROUTE}
        element={<PrivateRoute component={Profile} />}
      />
      <Route path={NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
