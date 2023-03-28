import { useState } from 'react';


const WorkoutBuilder = () => {
  const structure =
    {
      exercise: '',
      sets: [
        {
          reps: '',
          rir: '',
          backoffPercent: '',
        }
      ]
    };

  const setStructure = {
    reps: '',
    rir: '',
    backoffPercent: '',
  }
  const [workout, setWorkout] = useState();
  const [grid, setGrid] = useState([]);

  const assignmentForm = (rowIdx) => {
    const slot = grid[rowIdx];
    return (
      <div key={rowIdx} className="relative rounded-xl overflow-auto">
        <div>
          <label>Exercise</label>
          <input type="text" className="border px-1" name="exercise" value={slot.exercise} onChange={(e) => updateExercise(e, rowIdx)}></input>
        </div>
        <div className="shadow-sm overflow-hidden my-2">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Set</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Reps</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">RIR</th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-right">Backoff Percent</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {slot.sets.map((set, setIdx) => {
                return (
                  <tr key={setIdx}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{setIdx + 1}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input className="px-1" type="number" name="reps" value={set.reps} onChange={(e) => updateSet(e, rowIdx, setIdx)}></input>
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 w-full p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input className="px-1 w-full" type="number" step="1" min="0" max="5" name="rir" value={set.rir} onChange={(e) => updateSet(e, rowIdx, setIdx)}></input>
                    </td>
                    <td className="flex border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input className="px-1 text-right" type="number" name="backoffPercent" value={set.backoffPercent} onChange={(e) => updateSet(e, rowIdx, setIdx)}></input>
                      <div>%</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button className="m-2 rounded-xl bg-slate-200 p-2" onClick={() => {
            removeExercise(rowIdx);
          }}>Remove Exercise</button>
          <button className="m-2 rounded-xl bg-slate-200 p-2" onClick={() => {
            addSet(rowIdx);
          }}>Add Set</button>
        </div>
      </div>
    )
  }

  const addExercise = () => {
    let copyGrid = [...grid];
    copyGrid.push({...structure})
    setGrid(copyGrid)
  }

  const removeExercise = (rowIdx) => {
    let copyGrid = [...grid];
    copyGrid.splice(rowIdx, 1);
    setGrid(copyGrid)
  }

  const updateExercise = (e, rowIdx) => {
    const { name, value } = e.target;
    const copyGrid = [...grid];

    copyGrid[rowIdx][name] = value;
    setGrid(copyGrid)
  }

  const addSet = (rowIdx) => {
    let copyGrid = [...grid];
    console.log(structure)
    copyGrid[rowIdx].sets.push({...setStructure})

    setGrid(copyGrid)
  }

  const updateSet = (e, rowIdx, setIdx) => {
    const { name, value } = e.target;
    const copyGrid = [...grid];

    copyGrid[rowIdx].sets[setIdx][name] = value;

    setGrid(copyGrid);
  }

  const submitWorkout = () => {
    console.log(grid)
  }

  return (
    <div className="grid items-center justify-center">
      <button className="rounded-2xl bg-slate-300 p-2" onClick={() => {
        submitWorkout()
      }}>Submit Workout</button>
      <div>
        {grid.map((slot, i) => {
          return assignmentForm(i)
        })}
      </div>
      <button className="rounded-2xl bg-slate-300 p-2" onClick={() => {
        addExercise()
      }}>Add new exercise</button>
    </div>
  )
}

export default WorkoutBuilder;