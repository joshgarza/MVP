import React from "react";

const ExerciseTable = ({ exercise, sets, screen, readOnly, updateResult }) => {
  const availableProps = new Set();
  sets.forEach((set) => {
    Object.keys(set).forEach((prop) => {
      set[prop] !== null && availableProps.add(prop);
    });
  });
  availableProps.add("weight");
  availableProps.delete("id");

  return (
    <div className="flex flex-col items-center mb-4">
      <h2 className="text-xl font-semibold mb-2">{exercise}</h2>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {[...availableProps].map((prop, i) => (
              <th key={i} className="border px-4 py-2">
                {prop}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sets.map((set, i) => (
            <tr key={i}>
              {[...availableProps].map((prop, j) => (
                <td key={j} className="border px-4 py-2">
                  {readOnly ? (
                    set[prop]
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
