import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name },
    notes,
    
  }
}) => {
  return (
    <div className='profile bg-light'>
        <h2>{name}</h2>
        
        
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      {notes}
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;