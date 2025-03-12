import ShowBooks from './pages/Home/ShowBooks';
import ListBooks from './pages/SelectedAuthor/SelectedAuthor';
import Header from './components/Header/Header';
import Admin from './pages/Admin/Admin';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ShowBooks />} />
                <Route path="/bookList" element={<ListBooks />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
