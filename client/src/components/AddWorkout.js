import { useState } from 'react';

const initialWorkoutValues = {
  client: '',
  exercise: '',
  reps: '',
  rpe: '',
  sets: '',
  weight: '',
}

const AddWorkout = ({ clientList }) => {
  const [workout, setWorkout] = useState([{...initialWorkoutValues}]);

  const handleChange = (e, i) => {
    e.preventDefault();
    const { name } = e.target;
    const workoutCopy = [...workout];
    workoutCopy[i][name] = e.target.value;
    console.log(initialWorkoutValues)

    setWorkout(workoutCopy)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(workout)
  }

  const renderWorkoutRow = (i) => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Clients:</label>
        <select value={workout[i].client} name="client" onChange={(e) => handleChange(e, i)}>
          {clientList.map((client, i) => {
            return <option key={i} value={client}>{client}</option>
          })}
        </select>
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
        <input type="submit"></input>
      </form>
    )
  }

  return (
    <>
      <div>Workout page</div>
      {workout.map((workout, i) => {
        return renderWorkoutRow(i)
      })}
      <button onClick={() => {
        const workoutCopy = [...workout];
        workoutCopy.push({...initialWorkoutValues});
        setWorkout(workoutCopy)
      }}>Add another row</button>
    </>
  )
}

export default AddWorkout;