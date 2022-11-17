const ClientDashboard = ({ workout }) => {
  return (
    <>
      <div className="h-[90%] w-full flex flex-wrap px-4 py-3">
        <div className="w-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center items-center">
          <h1 className="mb-2 text-3xl">Dashboard</h1>
        </div>
        <div className="w-screen flex justify-between">
          <div className="w-56">
            <div className="text-xl">Coach Information</div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
              <div>
                Josh Garza
              </div>
              <div>
                josh@sf-iron.com
              </div>
            </div>
          </div>
          <div className="w-[60%]">
            <div className="text-xl ">Upcoming Workouts</div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col justify-start items-center">
              Next:
              {workout.map((slot, i) => {
                return (
                  <div key={i} className="mx-2 flex">
                    <div>{slot.exercise} x {slot.reps} reps @{slot.rpe}{slot.weight}</div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
        <div className="text-2xl">Stats</div>
        <div className="h-96 w-screen mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="block">
              <div className="my-4 text-base">
                Adherence: 90% - 123 / 137 workouts completed
              </div>
              <div className="my-4 text-base">
                Squat PR: 475lb
              </div>
              <div className="my-4 text-base">
                Bench PR: 340lb
              </div>
              <div className="my-4 text-base">
                Deadlift PR: 500lb
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard;