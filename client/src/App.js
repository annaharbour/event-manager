import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Alert from './Components/Layout/Alert';
import Dashboard from './Components/dashboard/Dashboard';
import ProfileForm from './Components/profile-forms/ProfileForm';
import EditProfile from './Components/profile-forms/EditProfile';
import Profiles from './Components/profiles/Profiles';
import Profile from './Components/user-profile/Profile';
import AddAssignment from './Components/profile-forms/AddAssignment';
import Posts from './Components/posts/Posts';
import Post from './Components/post/Post';
import PrivateRoute from './Components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './utils/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

const App = () => {
  
  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    };

    store.dispatch(loadUser());
  }, []);

 return (
  <Provider store={store}>
    <Router>
        <Navbar />
          <Alert/>
          <Routes>
          <Route path="/profiles" element={<PrivateRoute component={Profiles} />} />
          <Route path="/profile/:id" element={<PrivateRoute component={Profile} />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={EditProfile} />}
          />
          <Route
            path="add-assignment"
            element={<PrivateRoute component={AddAssignment} />}
          />
          <Route
            path="posts"
            element={<PrivateRoute component={Posts} />}
          />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} />

          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          </Routes>
    </Router>
  </Provider>
  )
}

export default App;

