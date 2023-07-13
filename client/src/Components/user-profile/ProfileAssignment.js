// import React, {useState, useEffect} from 'react';
// import { useParams } from 'react-router';
// import { getAssignments } from '../../fetchers';
// import PropTypes from 'prop-types';

// function ProfileAssignment(){
//   const [assignments, setAssignments] = useState({});
//   const { id: userId } = useParams();


//   useEffect(() => {
//     getAssignments().then((assignmentsByJob) => {
//       setAssignments(assignmentsByJob)
//     })
// }, []);
//   return (
//     <>
//     {
//       Object.keys(assignments).map((day) => {
//       const assignmentsForDayKey = assignments[day];
//       return (
//       <div>

//         <p className='capitalize'>{day}</p>
//         {assignmentsForDayKey.map((assignment) => {
//           const userIsAssigned = assignment.assignedTo.find((assignedTo) => {
//             return assignedTo._id === userId
//           })
//           if(!userIsAssigned){
//             return null
//           }
//           return <span className='capitalize'>{assignment.jobName}</span>

//         })}

//         </div>


//       )
//     })}
//   </>
// )};
// ProfileAssignment.propTypes = {
//   assignment: PropTypes.object.isRequired
// };

// export default ProfileAssignment;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getAssignments } from '../../fetchers';
import PropTypes from 'prop-types';

function ProfileAssignment() {
  const [assignments, setAssignments] = useState({});
  const { id: userId } = useParams();

  useEffect(() => {
    getAssignments().then((assignmentsByJob) => {
      setAssignments(assignmentsByJob);
    });
  }, []);

  useEffect(() => {
    // Filter assignments to only include assignments where the user is assigned
    const filteredAssignments = Object.keys(assignments).reduce((filtered, day) => {
      const assignmentsForDay = assignments[day].filter((assignment) =>
        assignment.assignedTo.some((assignedTo) => assignedTo._id === userId)
      );

      if (assignmentsForDay.length > 0) {
        filtered[day] = assignmentsForDay;
      }

      return filtered;
    }, {});

    setAssignments(filteredAssignments);
  }, [assignments, userId]);

  return (
    <>
      {Object.keys(assignments).map((day) => {
        const assignmentsForDayKey = assignments[day];
        return (
          <div key={day}>
            <p className='capitalize'>{day}</p>
            {assignmentsForDayKey.map((assignment) => (
              <span key={assignment._id} className='capitalize'>
                {assignment.jobName}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
}

ProfileAssignment.propTypes = {
  assignment: PropTypes.object.isRequired
};

export default ProfileAssignment;
