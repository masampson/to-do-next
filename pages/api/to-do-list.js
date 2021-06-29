import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../util/db";

// "controller" function
async function insertTodoListItem(data) {
  const { client, db } = await connectToDatabase();
  const toDoListCollection = db.collection("toDoList");
  const result = await toDoListCollection.insertOne(data);
}

async function getList() {
  const { client, db } = await connectToDatabase();
  const toDoListCollection = db.collection("toDoList");
  const toDoList = await toDoListCollection.find().toArray();
  return toDoList;
}

async function toggleActive(id) {
  const { client, db } = await connectToDatabase();
  const toDoListCollection = db.collection("toDoList");
  console.log(toDoListCollection);
  const result = toDoListCollection.find({ _id: id });
  console.log(result);
  console.log("Function Triggered");
}

async function handler(req, res) {
  if (req.method === "GET") {
    const list = await getList();
    return res.json(list);
  }

  if (req.method === "POST") {
    const data = req.body;

    // should be in a try/catch in case of errors
    await insertTodoListItem(data);
    res.status(201).json({ message: "Item inserted!" });
  }

  if (req.method === "PATCH") {
    const id = req.body;
    console.log(id);
    await toggleActive(id);
    res.status(201).json({ message: "Button clicked" });
  }
}

export default handler;
