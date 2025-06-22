import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    list: [
        {
            "id": "1",
            "firstName": "Ahmet",
            "lastName": "Yılmaz",
            "dateOfEmployment": "2025-06-01",
            "dateOfBirth": "1990-03-15",
            "phone": "+90 555 123 45 67",
            "email": "ahmet@example.com",
            "department": "Tech",
            "position": "Junior"
        },
        {
            "id": "2",
            "firstName": "Mehmet",
            "lastName": "Kara",
            "dateOfEmployment": "2024-11-10",
            "dateOfBirth": "1988-07-22",
            "phone": "+90 532 765 43 21",
            "email": "mehmet@example.com",
            "department": "Analytics",
            "position": "Senior"
        }
    ]
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: {
            reducer(state, action) {
                state.list.push(action.payload)
            },
            prepare(employee) {
                return {
                    payload: {
                        id: nanoid(),
                        ...employee
                    }
                }
            }
        },
        updateEmployee(state, action) {
            const idx = state.list.findIndex(emp => emp.id === action.payload.id)
            if (idx !== -1) {
                state.list[idx] = action.payload
            }
        },
        deleteEmployee(state, action) {
            state.list = state.list.filter(emp => emp.id !== action.payload)
        }
    }
})

export const {
    addEmployee,
    updateEmployee,
    deleteEmployee
} = employeeSlice.actions

export default employeeSlice.reducer