import React from 'react';
import PropTypes from 'prop-types';

const ProfileAssignment = ({
  assignment: { day1am, day1pm, day2am, day2pm, day3am, day3pm }
}) => (
  <div>
    <h3 className="text-dark">Assignment</h3>
    {/* <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p> */}
    <p>
      <strong>Day One AM: </strong> {day1am}
    </p>
    <p>
      <strong>Day One PM: </strong> {day1pm}
    </p>
    <p>
      <strong>Day Two AM: </strong> {day2am}
    </p>
    <p>
      <strong>Day Two PM: </strong> {day2pm}
    </p>
    <p>
      <strong>Day Three AM: </strong> {day3am}
    </p>
    <p>
      <strong>Day Three PM: </strong> {day3pm}
    </p>
  </div>
);

ProfileAssignment.propTypes = {
  assignment: PropTypes.object.isRequired
};

export default ProfileAssignment;