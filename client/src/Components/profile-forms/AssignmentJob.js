import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setAlert} from "../../actions/alert";
import {deleteAssignment} from "../../actions/profile";

export default function AssignmentJob({assignment, getAssignments}) {
  // you don't need to use `connect()` to map an action as a dispatcher, you can
  // use this `useDispatch()` hook to get the dispatcher. Just a suggestion, but both will work fine.
  const dispatch = useDispatch();

  // here we can use `useSelector` to pull a piece of data out of the store. These can also be on their
  // own modules and imported to prevent you from having to rewrite them elsewhere. They are just simple functions.
  const {_id: userId, isAdmin} = useSelector(({profile}) => profile?.profile?.user || {});

  const profiles = useSelector(({profile: {profiles}}) => profiles);

  // useMemo, will only calculate once and cache the result such that we don't have to recreate
  // this array on each render. This is an optimization but only becomes truely noticeable if we
  // have hundreds or even thousands of calculations per render.
  const arrayTheSizeOfMaxAssignees = useMemo(() => {
    return [...(new Array(assignment.maxAssignees))];
  }, [assignment.maxAssignees]);

  function assignUser(userIdOverride) {
    // Make the change in the database and no matter if it was successful or not, refetch
    // all the assignments to show any changes that may have occurred.
    axios.patch(`/api/assignments/${assignment._id}`, userIdOverride).then(({data: {success, message}}) => {
      if (success) dispatch(setAlert('Assignment added', 'success'));
      if (!success) dispatch(setAlert(message, 'danger'));
    }).finally(getAssignments);
  }

  // disable the "assign me" button if all the slots are assigned.
  const completelyFilled = assignment.assignedTo.length === assignment.maxAssignees;
  // let's look to see if the current user is assigned to this particular assignment.
  // if they are we will change the "Assign me" button to allow them to remove it.
  // This way they won't have to go back to the dashboard to undo an assignment
  const isAssignedToDay = !!assignment.assignedTo.find(({_id}) => _id === userId);

  return (
    <div key={`job_assignment_${assignment._id}`}>
      <div className='flex justify-between items-center'>
        <div>{assignment.jobName}</div>
        <form onSubmit={(e) => {
          e.preventDefault();

          if (isAssignedToDay) {
            dispatch(deleteAssignment(assignment._id)).finally(getAssignments);
            return;
          }

          assignUser();
        }}>
          <button disabled={completelyFilled && !isAssignedToDay} type="submit">
            { !isAssignedToDay ? 'Assign me' : 'Remove me' }
          </button>
        </form>
      </div>
      <div  style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}>
        <div>
          {
            // We want to show the user how many slots there are available, so let's create an empty array
            // the size of the max number of assignees. As we map that array, use the current index to see
            // if there is an assigned user at that index. If so, show that user's name
            arrayTheSizeOfMaxAssignees.map((_val, idx) => {
              return (
                <ul key={`assignee_${assignment._id}_slot_${idx}`} style={{display: 'flex', listStyle: 'inside'}}>
                  <li>
                    {assignment.assignedTo[idx]?.name || 'Empty Slot'}
                    {isAdmin && assignment.assignedTo[idx]?.name && (
                      <span onClick={()=> {
                        console.log(assignment._id, assignment.assignedTo[idx]?._id)
                        dispatch(deleteAssignment(assignment._id, assignment.assignedTo[idx]?._id)).finally(getAssignments)
                      }}>Delete</span>
                    )}
                  </li>
                </ul>
              )
            })
          }
        </div>
        {
          isAdmin && (
            <div>
              <br />
              <hr />
              <br />
              <form style={{
                width: '100%',
                justifyContent: 'space-evenly',
                display: 'flex'
              }} onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                assignUser(Object.fromEntries(data.entries()));
              }}
              >
                <select name="selectedUser" defaultValue="" style={{marginRight: '1em', width: '100%'}}>
                  <option disabled value="">Select a user to assign</option>
                  {
                    profiles.map(({user: profile}) => {
                      return (<option key={`admin_only_select_user_to_assign_${profile._id}`} value={profile._id}>{profile.name}</option>)
                    })
                  }
                </select>
                <button type='submit'>Assign</button>
              </form>
            </div>
          )
        }
      </div>
    </div>
  )
}
