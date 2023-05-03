import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { apiRequests } from "../../util/apiRequests.js";
import { populateClientLookupTable } from "../../util/populateClientLookupTable";

const CoachDashboard = ({ clientLookupTable, setClientLookupTable }) => {
  const { logout, userObject } = useAuth();
  const [addClientField, setAddClientField] = useState("");
  const [clientAdded, setClientAdded] = useState(false);
  const [error, setError] = useState(false);
  // const [clientLookupTable, setClientLookupTable] = useState({});

  useEffect(() => {
    populateClientLookupTable(userObject.id)
      .then((result) => {
        setClientLookupTable(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mapClientList = () => {
    return Object.keys(clientLookupTable).map((clientId, i) => {
      const client = clientLookupTable[clientId];
      return <li key={i}>{client.name}</li>;
    });
  };

  const isEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const handleAddClient = (e) => {
    e.preventDefault();

    if (isEmail(addClientField)) {
      apiRequests
        .addClient(userObject.id, addClientField)
        .then((result) => {
          setClientAdded(true);
          populateClientLookupTable(userObject.id);
        })
        .catch((error) => {
          console.log(error);
          setError("Error adding client");
        });
    } else {
      setError("Invalid email format");
    }
    const timer = setTimeout(() => {
      setClientAdded(false);
      setError(false);
      clearTimeout(timer);
    }, 5000);
  };

  return (
    <>
      <div className="h-[calc(100%-4.5rem)] w-full flex flex-wrap px-4 py-3">
        <div className="animate-slide-in-left h-[40%] w-screen mt-4 bg-[#e7f2f8]/[0.5] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 flex justify-center items-start text-3xl">
          Upcoming workouts
        </div>
        <div className="h-[60%] animate-slide-in-bottom w-screen flex justify-between">
          <div className="w-[20rem] h-[90%]">
            <div className="h-full bg-[#f0ede8]/[0.5] shadow-md rounded-2xl p-[1rem] overflow-auto">
              <div className="text-xl">Client List</div>
              <form
                onSubmit={(e) => {
                  handleAddClient(e);
                }}
              >
                <input
                  type="email"
                  placeholder="Enter client email"
                  value={addClientField}
                  onChange={(e) => {
                    setAddClientField(e.target.value);
                  }}
                ></input>
                <button className="rounded-2xl bg-slate-300 p-2 m-2">
                  Add client
                </button>
                {clientAdded && <div>Client added!</div>}
                {error && <div>{error}</div>}
              </form>
              <div className="rounded px-8 pt-6 pb-8 mb-4 flex-col justify-center items-center">
                {mapClientList()}
              </div>
            </div>
          </div>
          <div className="h-[90%] w-[60%] overflow-auto bg-[#f5f6f6]/[0.4] rounded-3xl p-[1rem]">
            <div className="text-xl">Comments</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachDashboard;
