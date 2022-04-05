import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Login from './containers/auth/login';
import Dashboard from './containers/dashboard';
import NotifyContainer from './containers/NotifyContainer';

const App = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <NotifyContainer />
        </>
    );
};

App.propTypes = {};

export default App;
