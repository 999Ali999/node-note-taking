import { getDB, insertDB, SaveDB } from "./db.js";

export const newNote = async (note, tags) => {
  try {
    const newNote = {
      tags,
      id: Date.now(),
      content: note,
    };

    await insertDB(newNote);
    return newNote;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNotes = async () => {
  try {
    const { notes } = await getDB();
    return notes;
  } catch (error) {
    console.log(error.message);
  }
};

export const findNote = async (id) => {
  try {
    const { notes } = await getDB();
    return notes.filter((note) =>
      note.content.toLowerCase().includes(id.toLowerCase())
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await SaveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  await SaveDB({ notes: [] });
};
