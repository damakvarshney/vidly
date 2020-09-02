import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: genres,
    selectedGenre: "Action",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genre = [{ id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genre });
  }

  handleDelete = (movie) => {
    const moviesAfterDelete = this.state.movies.filter(
      (movieAskedToDelete) => movieAskedToDelete._id !== movie._id
    );
    this.setState({ movies: moviesAfterDelete });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    //this line changes page
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;
    //this means this.state.movies.length

    if (count === 0) {
      return <p>There are no movies in database.</p>;
    }

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2" style={{ margin: 20 }}>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col" style={{ margin: 20 }}>
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            movies={movies}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
