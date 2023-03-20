import { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Box, Typography } from '@mui/material';


// TODO: adjust when get workouts is getting called so that the get request happens anytime we load dashboard or workouts
const ClientWorkouts = ({ workout }) => {
  const workoutCopy = JSON.parse(JSON.stringify(workout));
  const [results, setResults] = useState([]);
  const [assignment, setAssignment] = useState(workoutCopy);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const updateAssignment = (e, i) => {
    e.preventDefault();
    setConfirmation('');
    setError('');
    const { name } = e.target;
    const assignmentCopy = [...assignment];
    assignmentCopy[i][name] = e.target.value;

    setAssignment(assignmentCopy);
  }

  const updateResults = (e, i) => {
    setConfirmation('');
    setError('')
    const resultsCopy = [...results];
    resultsCopy[i] = e.target.value;
    setResults(resultsCopy)
  }

  const renderAssignment = (slot, i) => {
    console.log(workout)
    const filtered = Object.keys(slot).filter((key) => {
      return key !== 'client_id' && key !== 'id' && slot[key].length !== 0;
    })
    return (
      <div>
        {filtered.map((key, i) => {
          return (
            <Box key={i}>
              <TextField id="filled-basic" label={key} variant="standard" type="text" value={slot[key]} name={key} onChange={((e) => updateAssignment(e, i))} />
            </Box>
          )
        })}
        <TextField id="filled-basic" label="Result" variant="standard" type="text" value={results[i]} onChange={(e) => updateResults(e, i)}/>
      </div>
    )
  }

  const submitResults = () => {
    let incomplete = false;
    let submission = [];
    assignment.forEach((entry, i) => {
      if (results[i] === undefined || results[i].length === 0) {
        incomplete = true;
        return setError(`Result in Assignment: ${i + 1} must contain a value`)
      } else if (!incomplete) {
        submission.push([entry, results[i]])
        console.log(submission, 'to submit')
        setConfirmation('Submitted', submission)
      }
    })
  }

  return (
    <>
      <div className="flex-col w-screen h-screen">
        <div className="my-4 px-2 text-xl">Assigned Workout:</div>
        <div className="mb-4 px-2 flex items-center">
          <button className="bg-[#394D79] hover:bg-[#293757] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" component="label" onClick={submitResults}>Submit Results</button>
          {error && <div className="ml-2">{error}</div>}
          {confirmation && <div className="ml-2">{confirmation}</div>}
        </div>
        <Box className="mx-4 flex flex-wrap [&>*]:mb-[1rem]">
          {assignment.map((slot, i) => {
            return (
              <div key={i} className="mx-2 flex-col bg-[#e7f2f8] rounded-3xl p-[1rem]">
                <Typography variant="h6">Assignment: {i + 1}</Typography>
                {renderAssignment(slot, i)}
              </div>
            )
          })}
        </Box>
      </div>
    </>
  )
}

export default ClientWorkouts;