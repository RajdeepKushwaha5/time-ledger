import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { Wallpaper } from './pages/Wallpaper';
import './index.css';

function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/wallpaper" element={<Wallpaper />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
