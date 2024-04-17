"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:3000/users";

const DataContext = createContext([]);
const initialState = {
  monthDays: [],
  monthData: [1, 2, 4, 5, 6, 7, 9, 10, 11, 14],
  yearData: [{ 1: [1, 2, 5] }, { 2: [3, 9, 8] }, { 4: [1, 15] }],
  yearDays: [],
  user: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "update_done":
      const newData = state.yearData.find((item) => {
        if (
          Object.entries(item)[0][0] === Object.entries(action.payload)[0][0]
        ) {
          return {
            [Object.entries(item)[0][0]]: [
              ...Object.entries(item)[0][1],
              ...Object.entries(action.payload)[0][1],
            ],
          };
        } else
          return {
            [Object.entries(item)[0][0]]: [
              ...Object.entries(action.payload)[0][1],
            ],
          };
      });

      console.log(newData);
      return {
        ...state,
        // monthData: [...state.monthData, ...action.payload],

        yearData: newData,
      };
    case "update_fail":
      return {
        ...state,
        monthData: [
          ...state.monthData.filter((day) => day !== +action.payload),
        ],
      };
    case "getYearDays":
      return {
        ...state,
        yearDays: [...action.payload],
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
  const [
    { monthData, yearDays, yearData, year, user, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    getYearDays();
  }, []);

  // Get Year Days /////////////////////////////////////////////////////////
  async function getYearDays() {
    dispatch({ type: "loading" });

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
    dispatch({ type: "getYearDays", payload: yearDays });
  }
  // Get Initial Data /////////////////////////////////////////////////////////
  // async function createMonthData() {
  //   dispatch({ type: "loading" });
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   try {
  //     const res = await fetch(`${BASE_URL}`);
  //     const data = await res.json();
  //     dispatch({ type: "calendarCreated", payload: data });
  //   } catch {
  //     dispatch({
  //       type: "error",
  //       payload: "There was an error loading data...",
  //     });
  //   }
  // }

  // Update /////////////////////////////////////////////////////////
  async function update(dayNumber, monthNumber, value) {
    dispatch({ type: "loading" });
    try {
      if (value === "done")
        dispatch({
          type: "update_done",
          payload: { [monthNumber]: [dayNumber] },
        });

      if (value === "fail")
        dispatch({ type: "update_fail", payload: [dayNumber] });

      // dispatch({ type: "update", payload: data });
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
        monthData,
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
