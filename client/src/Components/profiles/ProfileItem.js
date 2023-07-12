import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// const ProfileItem = ({
//   profile: {
//     user: { _id, name },    
//   }
// }) => {



//   return (
//     <div className='profile bg-light'>
//         <h2>{name}</h2>
//         <Link to={`/profile/${_id}`} className='btn btn-primary'>
//           View Profile
//         </Link>
//     </div>
//   );
// };

const ProfileItem = ({ profile }) => {
  const { user } = profile;

  if (!user) {
    return <div>User information not available.</div>; // or render a placeholder
  }

  const { _id, name } = user;

  return (
    <div className="profile bg-light">
      <h2>{name}</h2>
      <Link to={`/profile/${_id}`} className="btn btn-primary">
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;