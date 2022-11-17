import { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import axios from 'axios';

const initialWorkoutValues = {
  exercise: '',
  reps: '',
  rpe: '',
  sets: '',
  weight: '',
}


const workout = {
  client: '',
  assignments: [
    {
      exercise: '',
      assignment: [
        {
          reps: '',
          rpe: '',
          sets: '',
          weight: '',
          backoffPercent: '',
          e1rmPercent: '',
        }
      ]
    }
  ]
}

// TODO: adding a row should be differentiated between adding more to the current exercise assignment vs adding a completely new slot
// maybe we can have add slot and add to exercise assignment? slot means new row entirely, add to exercise assignment can allow for backoffs and rampups etc to be added to an exercise slot

const AddWorkout = ({ clientList }) => {
  const [client, setClient] = useState();
  const [workout, setWorkout] = useState([{...initialWorkoutValues}]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e, i) => {
    e.preventDefault();
    setConfirmation('');
    setError('');

    const { name } = e.target;
    const workoutCopy = [...workout];
    workoutCopy[i][name] = e.target.value;

    setWorkout(workoutCopy)
  }

  const submitWorkout = () => {
    let assignment = []
    for (let row of workout) {
      let slot = {}
      if (row.exercise === '') {
        setError('Error: exercise selection required')
        return;
      }
      if (row.reps === '') {
        setError('Error: reps selection required')
        return;
      }
      if (row.rpe === '' && row.weight === '') {
        setError('Error: rpe or weight selection required')
        return;
      }

      for (let detail in row) {
        if (row[detail] === '') continue;
        slot[detail] = row[detail]
      }
      assignment.push(slot)
    }
    if (assignment.length === 0) {
      setError('Error: Assignment must contain at least one slot')
    } else {
      console.log(assignment)
      // send POST request to server with assignment as payload
      axios.post(`/api/workout`, {
        clientId: 4,
        assignment: assignment
      })
      setConfirmation(`Workout assigned: ${JSON.stringify(assignment)}`)
      setWorkout([{...initialWorkoutValues}])
      setError('')
    }
  }

  // const renderAssignment = (e, i) => {
  //   e.preventDefault();
  //   return (
  //     <>
  //       <input type="text" name="reps" value={workout[i].reps} onChange={(e) => handleChange(e, i)}></input>
  //       <label>RPE</label>
  //       <input type="text" name="rpe" value={workout[i].rpe} onChange={(e) => handleChange(e, i)}></input>
  //       <label>Sets</label>
  //       <input type="text" name="sets" value={workout[i].sets} onChange={(e) => handleChange(e, i)}></input>
  //       <label>Weight</label>
  //       <input type="text" name="weight" value={workout[i].weight} onChange={(e) => handleChange(e, i)}></input>
  //     </>
  //   )
  // }

  const renderWorkoutRow = (i) => {
    return (
      <Box>
        <br/>
        <Typography variant="h6">Slot: {i + 1}</Typography>
        <Box className="mx-2">
          <TextField variant="standard" label="Exercise" name="exercise" value={workout[i].exercise} onChange={(e) => handleChange(e, i)}></TextField>
          <br/>
          <TextField variant="standard" label="Reps" name="reps" value={workout[i].reps} onChange={(e) => handleChange(e, i)}></TextField>
          <br/>
          <TextField variant="standard" label="RPE" name="rpe" value={workout[i].rpe} onChange={(e) => handleChange(e, i)}></TextField>
          <br/>
          <TextField variant="standard" label="Weight" name="weight" value={workout[i].weight} onChange={(e) => handleChange(e, i)}></TextField>
          <br/>
          <TextField variant="standard" label="Sets" name="sets" value={workout[i].sets} onChange={(e) => handleChange(e, i)}></TextField>
          {/* <button onClick={(e) => renderAssignment(e, i)}>Add to assignment</button> */}
        </Box>
      </Box>
    )
  }

  const removeRow = () => {
    setConfirmation('');
    setError('');
    const workoutCopy = [...workout];
    workoutCopy.pop();
    setWorkout(workoutCopy);
  }

  return (
    <>
      <div className="flex-col w-screen h-screen">
        <div className="mt-4 text-xl">Workout Creation</div>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Client:</label>
            <select className="w-[25%] shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={workout.client} name="client" onChange={(e) => setClient(e.target.value)}>
              {clientList.map((client, i) => {
                return <option key={i} value={client}>{client}</option>
              })}
            </select>
          </div>
          <div className="flex justify-start">
            <button className="px-2 mx-2 bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {
              setConfirmation('');
              setError('');
              const workoutCopy = [...workout];
              workoutCopy.push({...initialWorkoutValues});
              setWorkout(workoutCopy)
            }}>Add another row</button>
            <button className="px-2 mx-2 bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {
              removeRow();
            }}>Remove Row</button>
            <button className="px-2 mx-2 bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submitWorkout}>Submit Workout</button>
          </div>
          {submitted && <div>Workout submitted</div>}
        </div>
        <div className="flex flex-wrap mx-2">
          {workout.map((workout, i) => {
            return renderWorkoutRow(i)
          })}
        </div >
        {error && <div>{error}</div>}
        {confirmation && <div>{confirmation}</div>}
      </div>
    </>
  )
}

export default AddWorkout;