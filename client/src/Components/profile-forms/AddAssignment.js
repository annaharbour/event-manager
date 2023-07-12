import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addAssignment, getProfiles} from '../../actions/profile';
import {useDispatch} from "react-redux";
import AssignmentJob from "./AssignmentJob";
import {getAssignments} from '../../fetchers'

const AddAssignment = () => {
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    refresh();
    dispatch(getProfiles());
  }, [dispatch]);

  function refresh() {
    getAssignments().then((assignmentsByJob) => {
      setAssignments(assignmentsByJob);
    });
  }

  return (
    <>
      <section className="container">
      <h1 className="large text-primary">Volunteer</h1>
        <p className='lead'>Volunteer for our next event July 27th - 30th!</p>
        {
          Object.keys(assignments).map((day) => {
            const assignmentsForDayKey = assignments[day];
            return (
              <div key={`assignment_${day}`} className="w-full">
                <div className="capitalize bg-primary p">
                  <h3>{day}</h3>
                </div>
                <br />
                <div className="grid grid-col grid-col-3">
                  {
                    assignmentsForDayKey.map((a) => {
                      return (
                        <div
                          className='job'
                          key={`assignment_list_${day}_assignment_id_${a._id}`}>
                          <AssignmentJob assignment={a} onAssigned={refresh} />
                        </div>
                      );
                    })
                  }
                </div>
                <br />
              </div>
            );
          })
        }

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </section>
    </>
  );
};

AddAssignment.propTypes = {
  addAssignment: PropTypes.func.isRequired
};

export default connect(null, { addAssignment })(AddAssignment);

