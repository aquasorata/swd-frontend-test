"use client"

import PersonForm from "@/components/PersonForm/PersonForm"
import PersonTable from "@/components/PersonForm/PersonTable"
import { Person } from "@/types/person";
import { useState } from "react";

export default function Page() {
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  return (
    <div style={{ padding: 40 }}>
      <PersonForm 
        editingPerson={editingPerson}
        setEditingPerson={setEditingPerson}
      />
      <div style={{ marginTop: 40 }}>
        <PersonTable setEditingPerson={setEditingPerson}/>
      </div>
    </div>
  )
}