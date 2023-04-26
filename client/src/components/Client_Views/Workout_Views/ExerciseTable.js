import React from "react";

const ExerciseTable = ({ exercise, sets, screen, readOnly, updateResult }) => {
  const exerciseSetDescriptors = new Set();
  sets.forEach((set) => {
    Object.keys(set).forEach((prop) => {
      set[prop] !== null && prop !== "id" && exerciseSetDescriptors.add(prop);
    });
  });
  exerciseSetDescriptors.add("weight");

  return (
    <div className="flex flex-col items-center mb-4">
      <h2 className="text-xl font-semibold mb-2">{exercise}</h2>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {[...exerciseSetDescriptors].map((prop, i) => (
              <th key={i} className="border px-4 py-2">
                {prop}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sets.map((set, i) => (
            <tr key={i}>
              {[...exerciseSetDescriptors].map((prop, j) => (
                <td key={j} className="border px-4 py-2">
                  {readOnly ? (
                    prop === "set" ? (
                      set[prop] + 1
                    ) : (
                      set[prop]
                    )
                  ) : prop === "set" ? (
                    set[prop] + 1
                  ) : (
                    <input
                      className="w-full"
                      size="1"
                      type="number"
                      name={prop}
                      value={prop === "set" ? set[prop] + 1 : set[prop] || ""}
                      onChange={(e) => {
                        updateResult(e, screen, i);
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseTable;
