"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { addPoint, getPoints } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const DataContext = createContext([]);
const initialState = {
  monthDays: [],
  yearData: {},
  yearDays: [],
  user: "",
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updatePoints":
      return {
        ...state,
        yearData: {
          ...state.yearData,
          ...{ [action.payload.monthNumber]: action.payload.days },
        },
      };

    case "getInitialData":
      return {
        ...state,
        yearDays: [...action.payload.yearDays],
        yearData: { ...action.payload.yearData },
        user: action.payload.user,
      };

    case "loading":
      return { ...state, isLoading: true };

    case "calendarCreated":
      return { ...state, isLoading: false };

    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function DataProvider({ children }) {
  const { isSignedIn, user, isLoaded } = useUser();
  // console.log(555, user);
  const [{ yearDays, yearData, year, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      if (isSignedIn) getInitialData();
    },
    [isSignedIn]
  );

  // Get Year Days /////////////////////////////////////////////////////////
  async function getInitialData() {
    dispatch({ type: "loading" });
    const res = await getPoints({ user: user.id, year: 2024 });
    const year = new Date().getFullYear();
    let monthDays = [];
    const yearDays = [];
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();
      monthDays = [];
      for (let day = 1; day <= daysInMonth; day++) {
        monthDays.push(day);
      }
      yearDays.push({ [month]: monthDays });
    }
    dispatch({
      type: "getInitialData",
      payload: { yearDays: yearDays, yearData: res, user: user.id },
    });
  }

  // Update /////////////////////////////////////////////////////////
  async function update(dayNumber, monthNumber, value) {
    dispatch({ type: "loading" });
    let days = [];
    try {
      if (value === "done") {
        days = yearData[monthNumber]
          ? [...yearData[monthNumber], dayNumber]
          : [dayNumber];
      }

      if (value === "fail") {
        days = yearData[monthNumber].filter((item) => +item !== dayNumber);
      }
      const data = {
        user: user.id,
        year: 2024,
        month: monthNumber,
        days: [...days],
      };
      const res = await addPoint(data);

      if (res.Error) throw new Error("Couldn't add point");

      dispatch({
        type: "updatePoints",
        payload: { monthNumber: monthNumber, days: days },
      });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error updating the data...",
      });
    }
  }

  return (
    <DataContext.Provider
      value={{
        year,
        yearDays,
        yearData,
        user,
        isLoading,
        update,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("DataContext was used outside of DataProvider");
  return context;
}

export { DataProvider, useData };
