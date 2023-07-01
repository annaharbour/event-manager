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
import AddEducation from './Components/profile-forms/AddEducation';
import AddExperience from './Components/profile-forms/AddExperience';
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
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />
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
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
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

