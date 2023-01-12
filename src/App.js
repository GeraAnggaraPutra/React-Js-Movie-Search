import { Card, Button } from 'react-bootstrap';
import './App.css';
import { getMovieList, searchMovie } from './Api'
import { useEffect, useState } from 'react';

function App() {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((results) => {
      setPopularMovies(results)
    })
  },[])

  const PopularMovieList = () => {
    return popularMovies.map((movie,i) => {
      return (
        <div key={i} className='col-md-4 mt-4 text-center'>
         <Card style={{ width: '18rem' }}>
          <Card.Img style={{ height: 400 }} variant="top" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <Card.Body>
          <Card.Title style={{ height: 60}}>{ movie.title }</Card.Title>
            <Card.Text>
              Realise : { movie.release_date}
            </Card.Text>
            <Button variant="primary" disabled>{ movie.vote_average }</Button>
           </Card.Body>
          </Card>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="container">
      <div className='header mt-3 text-center'>
         <h1>React JS Movie Search</h1>
      </div>
      <div className='search text-center mt-2 mb-2'>
         <input placeholder='Cari film kesayangan' onChange={ ({target}) => search(target.value) }></input>
      </div>
      <div className='row'>
         <PopularMovieList />
       </div>
    </div>
  );
}

export default App;
