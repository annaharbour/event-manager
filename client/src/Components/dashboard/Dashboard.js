import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import DashboardActions from './DashboardActions';
import Assignment from './Assignment';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth : {user}, profile: { profile, assignments, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ?  (
    <Spinner/>
    ) : (
    <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Welcome { user?.name}
      </p>
      {profile !==null ? (
        <>
      <DashboardActions />
      <Assignment assignment={assignments} />

      <div className='my-2'>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>
          <i className='fas fa-user-minus'></i> Delete My Account
        </button>
      </div>
      </>
          ) : (
      <Fragment>
        <p>You have not yet set up a profile. Please add some info.</p>
        <Link to='/create-profile' className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
      )}
      <p className='line'></p>
      <p className='small'>If you have any questions or concerns, email us at <i>< a href="mailto:sj.east.secretary@ponyclub.org?subject=assignment">sj.east.secretary@ponyclub.org</a></i></p>
    </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)

