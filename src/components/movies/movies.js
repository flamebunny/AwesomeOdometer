import React from 'react'
import { connect } from 'react-redux'
import { Movie } from '../movie/movie'

export const Movies = ({ fetching, movies }) =>
  fetching ?
    <div>Loading</div> :
    <div>
      {movies.map(movie => <Movie key={movie.id} {...movie} />)}
    </div>

export default connect(state => state.movies)(Movies)
