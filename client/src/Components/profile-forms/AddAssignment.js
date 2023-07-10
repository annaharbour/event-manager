import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addAssignment, getProfiles} from '../../actions/profile';
import axios from "axios";
import {useDispatch} from "react-redux";
import AssignmentJob from "./AssignmentJob";

const AddAssignment = () => {
  const dispatch = useDispatch();
  const [assignments, setAssignments] = useState({});

  useEffect(getAssignments, []);
  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  function getAssignments() {
    axios.get('/api/assignments').then(({data: {assignments: allAssignments}}) => {
      /* We need to transform the response from the server so that it's simpler to render
       * We're going to take the array returned from the server and make an object out of it.
       * It's structure will look something like...
       * {
       *   'friday AM': [assignment objects],
       *   'friday PM': [assignment objects],
       *   'saturday PM': [assignment objects],
       *   ...
       * }
       */
      const assignmentsByJob = allAssignments.reduce((acc, a) => {
        // These first two constants will be concatenated to create our unique object key
        const {day} = a;
        // Uppercase am/pm to it displays better to the user, i.e. friday AM
        // Note: friday will be capitalized in CSS via text-transform: 'capitalize'
        const ampm = a.ampm.toUpperCase();

        // create a unique key based on the day and time of day
        const key = `${day} ${ampm}`;

        // Find the key, if it isn't found, create it and set it to an empty array
        acc[key] ||= [];
        // append the assignment to this key in the object
        acc[key].push(a);

        // the above lines can be simplified in one line to the this...
        //acc[key] = [...(acc[key] || []), a];

        // return the accumulator, this is the object that we are building and that will eventually be
        // returned by `reduce` and set to assignmentsByJob
        return acc;
      }, {});

      setAssignments(assignmentsByJob);
    });
  }

  return (
    <>
      <section className="container">
        {
          Object.keys(assignments).map((day) => {
            const assignmentsForDayKey = assignments[day];
            return (
              <div key={`assignment_${day}`} className="w-full">
                <div className="capitalize bg-primary p">
                  <h3>{day}</h3>
                </div>
                <br />
                <div className="flex" style={{justifyContent: 'space-around', flexWrap: 'wrap'}}>
                  {
                    assignmentsForDayKey.map((a) => {
                      return (
                        <div
                          key={`assignment_list_${day}_assignment_id_${a._id}`}
                          style={{
                          width: '49%',
                          marginRight: '5px',
                          border: '1px gray solid',
                          padding: '1em',
                          borderRadius: '0.5em',
                          marginBottom: '1em',
                          height: '100%',
                        }}>
                          <AssignmentJob assignment={a} getAssignments={getAssignments} />
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
