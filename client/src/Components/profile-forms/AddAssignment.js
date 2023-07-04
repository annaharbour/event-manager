import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAssignment } from '../../actions/profile';

const AddAssignment = ({ addAssignment }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    day1am: '',
    day1pm: '',
    day2am: '',
    day2pm: '',
    day3am: '',
    day3pm: ''
  });

  const { day1am, day1pm, day2am, day2pm, day3am, day3pm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Assignment</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Sign up for up to one role per timeslot
      </p>
      <small>Please sign up for at least one role for this event!</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addAssignment(formData).then(() => navigate('/dashboard'));
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day1am"
            value={day1am}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day1pm"
            value={day1pm}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day2am"
            value={day2am}
            onChange={onChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day2pm"
            value={day2pm}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day3am"
            value={day3am}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Select a role"
            name="day3pm"
            value={day3pm}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddAssignment.propTypes = {
  addAssignment: PropTypes.func.isRequired
};

export default connect(null, { addAssignment })(AddAssignment);