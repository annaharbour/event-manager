import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAssignment } from '../../actions/profile';

const Assignment = ({ assignment = [], deleteAssignment }) => {
  if (!assignment.length) {
    return (
      <div style={{marginTop: '3em'}}>You don't have any assignments yet.</div>
    )
  }

  const assignments = assignment.map((ass) => (
    <tr key={ass._id}>
      <td>{ass.jobName}</td>
      <td className="capitalize">{ass.day}</td>
      <td className="uppercase">{ass.ampm}</td>
      <td>
        <button
          onClick={() => window.confirm('Are you sure you want to remove this assignment?') && deleteAssignment(ass._id)}
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
