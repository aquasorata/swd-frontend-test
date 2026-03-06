import { Dayjs } from "dayjs"

export interface FormValues {
  title: "1" | "2"

  firstname: string
  lastname: string

  birthday: Dayjs

  nationality: "Thai" | "USA" | "France"

  citizenId: [
    string, // 1 digit
    string, // 4 digits
    string, // 5 digits
    string, // 2 digits
    string  // 1 digit
  ]

  gender: "Male" | "Female" | "Unsex"

  countryCode: "+66" | "+1" | "+33"
  phone: string

  passport?: string

  salary: string
}

export interface Person {
  id: string,
  title: string
  firstname: string
  lastname: string
  birthday: string

  nationality: string

  citizenId: [
    string, // 1
    string, // 4
    string, // 5
    string, // 2
    string  // 1
  ]

  gender: "Male" | "Female" | "Unsex"

  countryCode: string
  phone: string

  passport?: string

  salary: string
}