import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    list: Array.from({ length: 10 }, (_, i) => ({
        id: nanoid(),
        firstName: `First${i + 1}`,
        lastName: `Last${i + 1}`,
        dateOfEmployment: `2025-06-${String((i % 30) + 1).padStart(2, '0')}`,
        dateOfBirth: `1990-${String(((i % 12) + 1)).padStart(2, '0')}-${String(((i % 28) + 1)).padStart(2, '0')}`,
        phone: `90500000${String(1000 + i).slice(-4)}`,
        email: `user${i + 1}@example.com`,
        department: i % 2 === 0 ? 'Tech' : 'Analytics',
        position: ['Junior', 'Medior', 'Senior'][i % 3]
    })),
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
            const idx = state.list.findIndex(emp => emp.id === action.payload.employee.id)
            if (idx !== -1) {
                state.list[idx] = action.payload.employee
            }
        },
        deleteEmployee(state, action) {
            state.list = state.list.filter(emp => emp.id !== action.payload.id)
        }
    }
})

export const selectEmployees = state => state.employee.list
export const selectEmployeeById = (state, id) =>
    state.employee.list.find(emp => emp.id === id)

export const {
    addEmployee,
    updateEmployee,
    deleteEmployee
} = employeeSlice.actions


export default employeeSlice.reducer