import { ObjectId } from 'mongodb'
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

async function updateListItem (listItemId, isListItemActive) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('toDoList')

    // finding and updating/saving are typically two distinct steps
    // but there are some helper methods so you can find & update
    // with one method instead

    const filter = {
      _id: ObjectId(listItemId)
    }

    const updateQuery = {
      $set: {
        active: isListItemActive
      }
    }

    const options = {
      returnDocument: 'after' // gives us the updated document to return
    }

    // https://docs.mongodb.com/drivers/node/usage-examples/updateOne/
    const result  = await collection.findOneAndUpdate(filter, updateQuery, options)
    return result?.value
  } catch (err) {
    console.error('updateListItem() failed', err.message)
    throw err
  }
}

async function handler(req, res) {
  // TODO there should be at least one try/catch for everything in this function, or
  // individual try/catch blocks for each method if the error needs to vary based on 
  // the request


  if (req.method === "GET") {
    const list = await getList();
    return res.json(list);
  }

  if (req.method === "POST") {
    const data = req.body;
    await insertTodoListItem(data);
    res.status(201).json({ message: "Item inserted!" });
  }

  if (req.method === "PATCH") {
    const { listItemId, isActive } = req.body
    const listItem = await updateListItem(listItemId, isActive)
    res.status(201).json(listItem)
  }
}

export default handler;
