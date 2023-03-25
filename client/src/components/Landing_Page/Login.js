import { useState } from 'react';


//how do we handle wave loading????

const workout = {
  'Alex A.': {
    'Tue Mar 21 2023': [
      {
        exercise: '',
        reps: '',
        rpe: '',
        sets: '',
        weight: '',
        backoffPercent: '',
        e1rmPercent: '',
      },
    ]
  }
}

const WorkoutBuilder = () => {
  const [workout, setWorkout] = useState();
  const [grid, setGrid] = useState([]);

  const assignmentForm = (rowIdx, colIdx) => {
    let letter = String.fromCharCode(65 + grid[rowIdx][colIdx]);
    console.log(grid[rowIdx][colIdx])

    return (
      <div className="flex gap-2 items-center justify-center">
        {letter}{colIdx + 1}
        <label>Exercise</label>
        <input type="text" className="border"></input>
        <button className="rounded-2xl bg-slate-300 p-2 m-2" onClick={() => {
          extendExercise(rowIdx)
        }}>
          Extend exercise
        </button>
        <button className="rounded-2xl bg-slate-300 p-2 m-2" onClick={() => {
          removeExtension(rowIdx, colIdx)
        }}>
          Remove extension
        </button>
      </div>
    )
  }

  const extendExercise = (rowIdx) => {
    let copyGrid = [...grid];
    copyGrid[rowIdx].push(rowIdx)
    setGrid(copyGrid)
  }

  const addExercise = () => {
    let copyGrid = [...grid];
    copyGrid.push([grid.length])
    setGrid(copyGrid)
  }

  const removeExtension = (rowIdx, colIdx) => {
    // splice out element and update grid
    let copyGrid = [...grid];

    if (copyGrid[rowIdx].length === 1) {
      console.log(rowIdx)
      copyGrid.splice(rowIdx, 1)
    } else {
      copyGrid[rowIdx].splice(colIdx, 1);
    }
    setGrid(copyGrid)
  }

  const removeExercise = (rowIdx) => {
    // splice out element and update grid
  }

  return (
    <div className="grid overflow-scroll">
      {grid.map((row, i) => {
        return grid[i].map((col, j) => {
          return (
            assignmentForm(i, j)
          )
        })
      })}
      <button className="rounded-2xl bg-slate-300 p-2" onClick={() => {
        addExercise()
      }}>Add new exercise</button>
    </div>
  )
}

export default WorkoutBuilder

// Drag and drop order. As click subExercise or new exercise, append exercise order list.

// On submit, send workout object and exercise order

// {
//   Date: {
//     workoutOrder: [0,1],
//     workouts: [
//      {
//        Assignment: {
//           exerciseOrder: [0,2,1,3,5,4],
//           exercises: [
//             {
//               exercise: “squat”,

//             },
//           ],
//         },
//       },
//       {
//         Exercise: “run”,
//       }
//     ]
//   }
// }