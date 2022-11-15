import { useState } from 'react';

const initialWorkoutValues = {
  exercise: '',
  reps: '',
  rpe: '',
  sets: '',
  weight: '',
}

// TODO: adding a row should be differentiated between adding more to the current exercise assignment vs adding a completely new slot
// maybe we can have add slot and add to exercise assignment? slot means new row entirely, add to exercise assignment can allow for backoffs and rampups etc to be added to an exercise slot

const AddWorkout = ({ clientList }) => {
  const [client, setClient] = useState();
  const [workout, setWorkout] = useState([{...initialWorkoutValues}]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e, i) => {
    e.preventDefault();
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
      setWorkout([{...initialWorkoutValues}])
      setError('')

    }
  }

  const renderWorkoutRow = (i) => {
    return (
      <>
        <div>Slot: {i + 1}</div>
        <form>
          <label>Exercise</label>
          <input type="text" name="exercise" value={workout[i].exercise} onChange={(e) => handleChange(e, i)}></input>
          <label>Reps</label>
          <input type="text" name="reps" value={workout[i].reps} onChange={(e) => handleChange(e, i)}></input>
          <label>RPE</label>
          <input type="text" name="rpe" value={workout[i].rpe} onChange={(e) => handleChange(e, i)}></input>
          <label>Sets</label>
          <input type="text" name="sets" value={workout[i].sets} onChange={(e) => handleChange(e, i)}></input>
          <label>Weight</label>
          <input type="text" name="weight" value={workout[i].weight} onChange={(e) => handleChange(e, i)}></input>
        </form>
      </>
    )
  }

  return (
    <>
      <div>Workout page</div>
      <label>Clients:</label>
      <select value={workout.client} name="client" onChange={(e) => setClient(e.target.value)}>
        {clientList.map((client, i) => {
          return <option key={i} value={client}>{client}</option>
        })}
      </select>
      {workout.map((workout, i) => {
        return renderWorkoutRow(i)
      })}
      <button onClick={() => {
        const workoutCopy = [...workout];
        workoutCopy.push({...initialWorkoutValues});
        setWorkout(workoutCopy)
      }}>Add another row</button>
      <button onClick={submitWorkout}>Submit Workout</button>
      {submitted && <div>Workout submitted</div>}
      {error && <div>{error}</div>}
    </>
  )
}

export default AddWorkout;