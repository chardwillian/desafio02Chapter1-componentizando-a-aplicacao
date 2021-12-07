import { Button } from "./Button";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { GenreResponseProps } from "../App";

type SidebarProps = {
  genres: GenreResponseProps[];
  handleSelectedGenre: (id: number) => void;
  selectedGenreId: number;
};

export function SideBar({
  genres,
  handleSelectedGenre,
  selectedGenreId,
}: SidebarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}