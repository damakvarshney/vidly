import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

//Main Page

class Movies extends Component {
  //states for all components
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: genres,
    selectedGenre: "All Genres",
    sortColumns: { path: "title", order: "asc" },
  };

  componentDidMount() {
    //Adding "all genre" category to listGroup of genres(action,comedy,thriller)
    const genre = [{ id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genre });
  }

  //for deleting a movie
  handleDelete = (movie) => {
    const moviesAfterDelete = this.state.movies.filter(
      (movieAskedToDelete) => movieAskedToDelete._id !== movie._id
    );
    this.setState({ movies: moviesAfterDelete });
  };

  //for providing a like to movie (boolean value) if liked means "true"
  handleLike = (movie) => {
    const moviesWithLikedInfo = [...this.state.movies];

    //getting index no of movie (received from component by onPress argument )
    const index = moviesWithLikedInfo.indexOf(movie);

    //clone of that single movie
    moviesWithLikedInfo[index] = { ...moviesWithLikedInfo[index] };

    //setting like if liked and vice-versa
    moviesWithLikedInfo[index].liked = !moviesWithLikedInfo[index].liked;
    this.setState({ movies: moviesWithLikedInfo });
  };

  //getting page no of movie and make it current(received from component by onPress argument )
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //handle genre selection with default value set
  //getting item as genre (received from component by onPress argument )
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  //
  handleSort = (sortColumns) => {
    this.setState({ sortColumns: sortColumns });
  };

  render() {
    //state destructuring
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumns,
    } = this.state;

    //for showing after render that there are no movies!
    if (allMovies.length === 0) {
      return <p>There are no movies in database.</p>;
    }

    // filtering by genres
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // after filtering to Sorting using lodash
    //_.orderBy(users_array, ['user_column', 'age_column'], ['asc', 'desc'])
    const sorted = _.orderBy(filtered, [sortColumns.path], [sortColumns.order]);

    //after sorted to pagination from lodash in util
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2" style={{ margin: 20 }}>
          {/* for genre */}
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            //className changer for Activation
            //shows if selected
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col" style={{ margin: 20 }}>
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            //two sorting property
            onSort={this.handleSort}
            sortColumns={sortColumns}
          />
          {/* for pagination */}
          <Pagination
            pageSize={pageSize}
            itemsCount={filtered.length}
            onPageChange={this.handlePageChange}
            //className Changer
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
