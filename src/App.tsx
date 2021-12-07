import { useState, useEffect } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

import { api } from "./services/api";

export interface MovieProps {
  Genre_id: number;
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  // Complete aqui
  useEffect(() => {
    api.get<MovieProps[]>("/movies").then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps[]>("/genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleSelectedGenreId(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        handleSelectedGenre={handleSelectedGenreId}
      />
      <Content
        movies={movies.filter((movie) => movie.Genre_id === selectedGenreId)}
        selectedGenre={genres.find((genre) => genre.id === selectedGenreId)}
      />
    </div>
  );
}