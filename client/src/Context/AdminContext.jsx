import { createContext, useState } from "react";


export const AdminAuthContext = createContext()

export function AdminContext({ children }) {
    const [admin, setAdmin] = useState({ id: null, name: null, status: false, email:null })


    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    )
}