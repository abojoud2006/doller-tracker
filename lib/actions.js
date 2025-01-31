"use server";
import Point from "./models/point";
import Goal from "./models/goal";
import { connectToDb } from "./mongoDb";
// import { revalidatePath, revalidateTag } from "next/cache";
// import { cache } from "react";

/////Get Goal-----------------
export async function getGoal(user) {
  try {
    const res = await Goal.find(user);
    if (!res) throw new Error("Couldn't find data");
    const goal = JSON.parse(JSON.stringify(res));

    return goal[0];
  } catch (error) {
    console.log(error.message);
    return { Error: error.message };
  }
}

/////Edit Goal
export async function editGoal(data) {
  try {
    const goal = await Goal.find({
      user: data.user,
    });
    if (goal.length > 0) {
      const res = await Goal.findOneAndReplace({ user: data.user }, data);
      if (!res) throw new Error("Couldn't find data");
    } else {
      const res = await Goal.create(data);
      if (!res) throw new Error("Couldn't find data");
    }
    // revalidatePath("/mongoDB");

    return { Success: "Document created successfully" };
  } catch (error) {
    console.log(error.message);
    return { Error: error.message };
  }
}

/////Get All Points-----------------
export async function getPoints(data) {
  let pointsObj = {};
  try {
    await connectToDb();
    const res = await Point.find(data);
    if (!res) throw new Error("Couldn't find data");
    const points = JSON.parse(JSON.stringify(res));
    points.map(
      (item) => (pointsObj = { ...pointsObj, ...{ [item.month]: item.points } })
    );
    return pointsObj;
  } catch (error) {
    return { error };
  }
}

/////Add Todo
export async function addPoint(data) {
  try {
    const month = await Point.find({
      month: data.month,
      year: data.year,
      user: data.user,
    });
    if (month.length > 0) {
      const res = await Point.findOneAndUpdate(
        { user: data.user, month: data.month },
        { points: data.points }
      );
      if (!res) throw new Error("Couldn't find data");
    } else {
      const res = await Point.create(data);
      if (!res) throw new Error("Couldn't find data");
    }
    // revalidatePath("/mongoDB");

    return { Success: "Document created successfully" };
  } catch (error) {
    console.log(error.message);
    return { Error: error.message };
  }
}
