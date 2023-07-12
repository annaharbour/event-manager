import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { getAssignments } from '../../fetchers';
import PropTypes from 'prop-types';

function ProfileAssignment(){
  const [assignments, setAssignments] = useState({});
  const { id: userId } = useParams();


  useEffect(() => {
    getAssignments().then((assignmentsByJob) => {
      setAssignments(assignmentsByJob)
    })
}, []);
  return (
    <>
    {
      Object.keys(assignments).map((day) => {
      const assignmentsForDayKey = assignments[day];
      return (
      <div>

        <p className='capitalize'>{day}</p>
        {assignmentsForDayKey.map((assignment) => {
          const userIsAssigned = assignment.assignedTo.find((assignedTo) => {
            return assignedTo._id === userId
          })
          if(!userIsAssigned){
            return null
          }
          return <span className='capitalize'>{assignment.jobName}</span>

        })}

        </div>


      )
    })}
  </>
)};
ProfileAssignment.propTypes = {
  assignment: PropTypes.object.isRequired
};

export default ProfileAssignment;
