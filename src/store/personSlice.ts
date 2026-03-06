import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Person } from "@/types/person"

const loadData = () => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("persons")
  return data ? JSON.parse(data) : []
}

const saveData = (data: Person[]) => {
  localStorage.setItem("persons", JSON.stringify(data))
}

interface PersonState {
  list: Person[]
  editingPerson: Person | null
}

const initialState: PersonState = {
  list: loadData(),
  editingPerson: null,
}

const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<Person>) {
      state.list.push(action.payload)
      saveData(state.list)
      alert("Add success");
    },

    deletePerson(state, action: PayloadAction<string>) {
      state.list = state.list.filter(p => p.id !== action.payload)
      saveData(state.list)
      alert("Delete success");
    },

    editPerson(state, action: PayloadAction<Person>) {
      const index = state.list.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
      saveData(state.list)
      alert("Edit success");
    },

    setEditingPerson(state, action: PayloadAction<Person>) {
      state.editingPerson = action.payload
    },

    clearEditingPerson(state) {
      state.editingPerson = null
    },

    deleteMultiple(state, action: PayloadAction<string[]>) {
      state.list = state.list.filter(p => !action.payload.includes(p.id))
      saveData(state.list)
      alert("Delete success");
    }
  }
})

export const {
  addPerson,
  deletePerson,
  editPerson,
  deleteMultiple,
  setEditingPerson,
  clearEditingPerson,
} =
  personSlice.actions

export default personSlice.reducer