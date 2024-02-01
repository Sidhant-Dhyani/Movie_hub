import './App.css';
import { Routes, Route } from 'react-router-dom';
import MoviePage from './components/moviepage/MoviePage'
import MovieContainer from './components/moviecontainer/MovieContainer';
import BookingForm from './components/form/BookingForm'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MovieContainer />} />
        <Route path='/movie/:id' element={<MoviePage />} />
        <Route path='/form/:id' element={<BookingForm />} />
      </Routes>
    </div>
  );
}

export default App;