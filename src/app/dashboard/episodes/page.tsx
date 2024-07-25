"use client";
import React from "react";
import Pagination from "@/components/Pagination/Pagination";
import useEpisodes from "@/hooks/useEpisodes";
import EpisodesTable from "@/components/EpisodesTable/EpisodesTable";
import Loading from "@/components/Loading/Loading";

const Home: React.FC = () => {
  const { apiCharacters, currentPage, totalPages, handlePageChange, loading } =
    useEpisodes();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {loading ? (
        <div className="flex flex-1 items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="w-full">
          <EpisodesTable
            apiCharacters={apiCharacters}
            totalPagess={totalPages}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
