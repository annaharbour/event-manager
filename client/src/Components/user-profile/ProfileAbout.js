import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    notes,
    user: { name },
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {notes && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Notes</h2>
        <p>{notes}</p>
        <div className='line' />
      </Fragment>
    )}
    
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;