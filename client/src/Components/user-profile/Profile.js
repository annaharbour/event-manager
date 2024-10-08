import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileAssignment from './ProfileAssignment';
import { getProfileById } from '../../actions/profile';
import axios from 'axios';

const Profile = ({ getProfileById, auth }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [assignments, setAssignments] = useState([]);
  useEffect( () => {
   axios.get(`/api/profile/user/${id}`).then((res) => {
    setProfile(res.data.profile)
    setAssignments(res.data.assignments);
  });
  }, [getProfileById, id]);
  if(!profile) {
    return null
  } else {
    console.log(profile)
  }

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Assignments</h2>
              {assignments.length > 0 ? (
                <Fragment>
                  {assignments.map((assignment) => (
                    <ProfileAssignment
                      key={assignment._id}
                      assignment={assignment}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No assignments yet</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};


Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  assignments: state.assignments,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
