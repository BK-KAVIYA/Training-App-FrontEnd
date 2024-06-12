// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BlogList from './components/BlogList';
import HomePage from './components/HomePage';
import About from './components/About';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import UserBlogList from './components/UserBlogList';
import SinglePostPage from './components/SinglePostPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
                    <NavBar />
                    <div className="w-full max-w-4xl p-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/dashadmin" element={<BlogList/>} />
                            <Route path="/dashuser" element={<UserBlogList/>} />
                            <Route path="/post/:postId" element={<SinglePostPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;