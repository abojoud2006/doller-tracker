"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { addPoint, getGoal, getPoints } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";

const daysInYear = new Date(2024, 1, 29).getDate() === 29 ? 366 : 365;

const calcFailPoints = (points) => {
  let days = 0;
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  for (let month = 1; month <= currentMonth; month++) {
    if (month < currentMonth) {
      days = days + new Date(year, month, 0).getDate();
    } else {
      days = days + today;
    }
  }
  return days - points;
};

const DataContext = createContext([]);
const initialState = {
  monthPoints: [],
  yearPoints: {},
  yearDays: [],
  user: "",
  isLoading: true,
  error: "",
  goal: {
    target: 0,
    dailyAmount: 0,
    currency: "",
    points: daysInYear,
    donePoints: 0,
    failPoints: 0,
    // Claculations
    remainPoints: function () {
      return this.points - (this.donePoints + this.failPoints);
    },
    balance: function () {
      return Math.round(this.dailyAmount * this.donePoints);
    },
    percentage: function () {
      return Math.ceil((this.balance() / this.target) * 100);
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "getInitialData":
      return {
        ...state,
        ...action.payload.state,
        goal: { ...state.goal, ...action.payload.goal },
        isLoading: false,
      };

    case "updatePoints":
      const x = action.payload.type === "done" ? 1 : -1;
      return {
        ...state,
        yearPoints: {
          ...state.yearPoints,
          ...{ [action.payload.monthNumber]: action.payload.points },
        },
        goal: {
          ...state.goal,
          donePoints: +state.goal.donePoints + x,
          failPoints: +state.goal.failPoints - x,
        },
        isLoading: false,
      };

    case "editGoal":
      return {
        ...state,
        goal: {
          ...state.goal,
          ...action.payload,
        },
        isLoading: false,
      };

    case "loading":
      return { ...state, isLoading: true };

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
  const [{ yearDays, yearPoints, year, goal, isLoading, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      if (isSignedIn) getInitialData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSignedIn]
  );

  // Get Year Days /////////////////////////////////////////////////////////
  async function getInitialData() {
    dispatch({ type: "loading" });
    const yearPoints = await getPoints({ user: user.id, year: 2024 });
    // calculate points
    let points = 0;
    Object.values(yearPoints).map((month) => (points = points + month.length));
    let failPoints = calcFailPoints(points);

    let goal = await getGoal({ user: user.id });
    goal = { ...goal, donePoints: points };
    goal.failPoints = failPoints;
    const year = new Date().getFullYear();
    let monthPoints = [];
    const yearDays = [];
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();
      monthPoints = [];
      for (let day = 1; day <= daysInMonth; day++) {
        monthPoints.push(day);
      }
      yearDays.push({ [month]: monthPoints });
    }
    dispatch({
      type: "getInitialData",
      payload: {
        state: { yearDays: yearDays, yearPoints: yearPoints, user: user.id },
        goal: goal,
      },
    });
  }

  // Update /////////////////////////////////////////////////////////
  async function update(dayNumber, monthNumber, type) {
    dispatch({ type: "loading" });
    let points = [];
    const year = new Date().getFullYear();
    try {
      if (type === "done") {
        points = yearPoints[monthNumber]
          ? [...yearPoints[monthNumber], dayNumber]
          : [dayNumber];
      }

      if (type === "fail") {
        points = yearPoints[monthNumber].filter((item) => +item !== dayNumber);
      }
      const data = {
        user: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        year: year,
        month: monthNumber,
        points: [...points],
      };
      const res = await addPoint(data);

      if (res.Error) throw new Error("Couldn't add point");

      dispatch({
        type: "updatePoints",
        payload: { monthNumber: monthNumber, points: points, type: type },
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
        yearPoints,
        goal,
        user,
        isLoading,
        update,
        error,
        dispatch,
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
