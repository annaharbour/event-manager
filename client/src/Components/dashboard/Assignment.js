import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAssignment } from '../../actions/profile';

const Assignment = ({ assignment, deleteAssignment }) => {

  const assignments = assignment.map((ass) => (
    <tr key={ass._id}>
      <td>{ass.day1am}</td>
      <td>{ass.day2pm}</td>
      <td>Test</td>
      <td>
        <button
          onClick={() => deleteAssignment(ass._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Assignments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Role</th>
            <th className="hide-sm">Day</th>
            <th className="hide-sm">AM/PM</th>
            <th />
          </tr>
        </thead>
        <tbody>{assignments}</tbody>
      </table>
    </Fragment>
  );
};

Assignment.propTypes = {
  assignment: PropTypes.array.isRequired,
  deleteAssignment: PropTypes.func.isRequired
};

export default connect(null, { deleteAssignment })(Assignment);