"use client";
import React from "react";
import Pagination from "@/components/Pagination/Pagination";
import useEpisodes from "@/hooks/useEpisodes";
import EpisodesTable from "@/components/EpisodesTable/EpisodesTable";

const Home: React.FC = () => {
  const { apiCharacters, currentPage, totalPages, handlePageChange } =
    useEpisodes();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full">
        <EpisodesTable apiCharacters={apiCharacters} totalPagess={totalPages} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
