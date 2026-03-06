"use client"

import PersonForm from "@/components/PersonForm/PersonForm"
import PersonTable from "@/components/PersonForm/PersonTable"

export default function Page() {
  return (
    <div style={{ padding: 40 }}>
      <PersonForm />
      <div style={{ marginTop: 40 }}>
        <PersonTable />
      </div>
    </div>
  )
}