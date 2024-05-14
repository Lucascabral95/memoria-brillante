import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from '../App'

const PublicRoutes = () => {
    return (
        <>

            <Routes>

                <Route path='/' element={<App />} />
                <Route path='/*' element={<App />} />

            </Routes>

        </>
    )
}

export default PublicRoutes