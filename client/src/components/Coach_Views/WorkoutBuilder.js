import { useState, useEffect } from "react";
import axios from "axios";

const WorkoutBuilder = ({
  onClose,
  date,
  clientId,
  populateClientLookupTable,
  clientLookupTable,
}) => {
  const [workout, setWorkout] = useState([]);
  const [edit, setEdit] = useState(false);
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (clientLookupTable[clientId].workouts[date] !== undefined) {
      setWorkout(clientLookupTable[clientId].workouts[date]);
      setEdit(true);
    }
  }, []);

  const structure = {
    exercise: "",
    sets: [
      {
        rpe: "",
        reps: "",
        rir: "",
        backoffPercent: "",
        weight: "",
      },
    ],
  };

  const setStructure = {
    rpe: "",
    reps: "",
    rir: "",
    backoffPercent: "",
    weight: "",
  };

  //   {
  //     "3": {
  //         "name": "josh",
  //         "workouts": {
  //             "Wed Mar 29 2023": [
  //                 {
  //                     "exercise": "squat",
  //                     "sets": [{
  //                       "reps": "4",
  //                       "rir": "2",
  //                       "weight": ""
  //                     }]
  //                 }
  //             ]
  //         }
  //     }
  // }

  const assignmentForm = (rowIdx) => {
    const slot = workout[rowIdx];
    return (
      <div key={rowIdx} className="relative rounded-xl overflow-auto m-4">
        <div>
          <label className="text-white mx-2">Exercise</label>
          <input
            type="text"
            className="border px-1"
            name="exercise"
            value={slot.exercise}
            onChange={(e) => updateExercise(e, rowIdx)}
          ></input>
        </div>
        <div className="shadow-sm overflow-hidden my-2">
          <table className="border-collapse table-fixed text-sm">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-light p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Set
                </th>
                <th className="border-b dark:border-slate-600 font-light p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Reps
                </th>
                <th className="border-b dark:border-slate-600 font-light p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  RIR
                </th>
                <th className="border-b dark:border-slate-600 font-light p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-right">
                  Backoff %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {slot.sets.map((set, setIdx) => {
                return (
                  <tr key={setIdx} className="leading-none">
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {setIdx + 1}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input
                        className="px-1 text-right text-black"
                        type="number"
                        name="reps"
                        value={set.reps}
                        onChange={(e) => updateSet(e, rowIdx, setIdx)}
                      ></input>
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input
                        className="px-1 w-10 text-right text-black"
                        type="number"
                        name="rir"
                        value={set.rir}
                        onChange={(e) => updateSet(e, rowIdx, setIdx)}
                      ></input>
                    </td>
                    <td className="flex border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <input
                        className="px-1 text-right text-black"
                        type="number"
                        name="backoffPercent"
                        value={set.backoffPercent}
                        onChange={(e) => updateSet(e, rowIdx, setIdx)}
                      ></input>
                      <div className="px-1">%</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end h-6">
          <button
            className="rounded-xl bg-slate-200 px-2"
            onClick={() => {
              removeExercise(rowIdx);
            }}
          >
            Remove Exercise
          </button>
          <button
            className="rounded-xl bg-slate-200 px-2"
            onClick={() => {
              addSet(rowIdx);
            }}
          >
            Add Set
          </button>
        </div>
      </div>
    );
  };

  const addExercise = () => {
    let copyWorkout = [...workout];
    copyWorkout.push({ ...structure });
    setWorkout(copyWorkout);
  };

  const removeExercise = (rowIdx) => {
    let copyWorkout = [...workout];
    copyWorkout.splice(rowIdx, 1);
    setWorkout(copyWorkout);
  };

  const updateExercise = (e, rowIdx) => {
    const { name, value } = e.target;
    const copyWorkout = [...workout];

    copyWorkout[rowIdx][name] = value;
    setWorkout(copyWorkout);
  };

  const addSet = (rowIdx) => {
    let copyWorkout = [...workout];
    copyWorkout[rowIdx].sets.push({ ...setStructure });

    setWorkout(copyWorkout);
  };

  const updateSet = (e, rowIdx, setIdx) => {
    const { name, value } = e.target;
    const copyWorkout = [...workout];

    copyWorkout[rowIdx].sets[setIdx][name] = value;

    setWorkout(copyWorkout);
  };

  const sanitizeInputs = (sanitizedWorkout) => {
    sanitizedWorkout.forEach((slot) => {
      slot.exercise = slot.exercise === "" ? null : slot.exercise;
      slot.sets.forEach((set) => {
        set.reps = set.reps === "" ? null : parseInt(set.reps);
        set.rir = set.rir === "" ? null : parseInt(set.rir);
        set.rpe = set.rpe === "" ? null : parseInt(set.rpe);
        set.backoffPercent =
          set.backoffPercent === "" ? null : parseInt(set.backoffPercent);
        set.weight = set.weight === "" ? null : parseInt(set.weight);
      });
    });

    return sanitizedWorkout;
  };

  const submitWorkout = () => {
    const data = {
      clientId: clientId,
      date: date,
      workout: sanitizeInputs(workout),
    };
    axios
      .post(`${apiBaseURL}/api/workout`, data)
      .then((result) => {
        console.log(result);
        populateClientLookupTable();
        onClose();
      })
      .catch((err) => console.log(err));
  };

  const editWorkout = () => {
    if (workout.length === 0) {
      deleteWorkout();
    } else {
      const data = {
        clientId: clientId,
        date: date,
        workout: workout,
      };
      data.workout.forEach((slot) => {
        slot.sets.forEach((set) => {
          set.reps = parseInt(set.reps);
          set.rir = parseInt(set.rir);
          set.rpe = parseInt(set.rpe);
          set.backoffPercent = parseInt(set.backoffPercent);
          set.weight = parseInt(set.weight);
        });
      });

      axios
        .put(`${apiBaseURL}/api/workout`, data)
        .then((result) => {
          console.log(result);
          populateClientLookupTable();
          onClose();
        })
        .catch((err) => {
          console.log(err);
          // alert('Error updating workout')
        });
    }
  };

  const deleteWorkout = () => {
    const data = {
      clientId: clientId,
      date: date,
    };

    axios
      .delete(`${apiBaseURL}/api/workout`, { data: data })
      .then((result) => {
        console.log(result);
        populateClientLookupTable();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        // alert('Error deleting workout')
      });
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-700/50 w-screen h-screen grid items-center justify-center">
        <div className="grid items-center justify-center bg-slate-700 w-[40rem] h-[100%] px-8 py-2">
          <div className="flex justify-between items-center p-8 my-2 w-[40rem]">
            <div className="text-white">{date}</div>
            {!edit ? (
              <button
                className="rounded-2xl bg-slate-300 p-2 m-2"
                onClick={() => {
                  submitWorkout();
                }}
              >
                Submit Workout
              </button>
            ) : (
              <>
                <button
                  className="rounded-2xl bg-slate-300 p-2 m-2"
                  onClick={() => {
                    editWorkout();
                  }}
                >
                  Edit Workout
                </button>
                <button
                  className="rounded-2xl bg-slate-300 p-2 m-2"
                  onClick={() => {
                    deleteWorkout();
                  }}
                >
                  Delete Workout
                </button>
              </>
            )}
            <button
              className="rounded-2xl bg-slate-300 p-2 m-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="overflow-y-auto h-[40rem]">
            {workout.map((slot, i) => {
              return assignmentForm(i);
            })}
          </div>
          <button
            className="rounded-2xl bg-slate-300 p-2 m-2"
            onClick={() => {
              addExercise();
            }}
          >
            Add new exercise
          </button>
          <button
            className="rounded-2xl bg-slate-300 p-2 m-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkoutBuilder;
