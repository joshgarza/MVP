import { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Box, Typography } from '@mui/material';

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
    return (
      <>
        {Object.keys(slot).map((key, i) => {
          return (
            <Box>
              {/* <label>{key}</label> */}
              <TextField id="filled-basic" label={key} variant="filled" type="text" value={slot[key]} name={key} onChange={((e) => updateAssignment(e, i))} />
            </Box>
          )
        })}
        {/* <label>Result</label> */}
        <TextField id="filled-basic" label="Result" variant="filled" type="text" value={results[i]} onChange={(e) => updateResults(e, i)}/>
      </>
    )
  }

  const submitResults = () => {
    let incomplete = false;
    let submission = [];
    assignment.forEach((entry, i) => {
      if (results[i] === undefined || results[i].length === 0) {
        incomplete = true;
        return setError(`Results in slot: ${i + 1} must contain a value`)
      } else if (!incomplete) {
        submission.push([entry, results[i]])
        console.log(submission, 'to submit')
        setConfirmation('Submitted', submission)
      }
    })
  }

  return (
    <>
      <Typography variant="h4">Client Workouts</Typography>
      <Box>
        {assignment.map((slot, i) => {
          // console.log(workout)
          return (
            <>
              <Typography variant="h6">Slot: {i + 1}</Typography>
              {renderAssignment(slot, i)}
            </>
          )
        })}
      </Box>
      <Button variant="contained" component="label" onClick={submitResults}>Submit Results</Button>
      {error && <div>{error}</div>}
      {confirmation && <div>{confirmation}</div>}
    </>
  )
}

export default ClientWorkouts;