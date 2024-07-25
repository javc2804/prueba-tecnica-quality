"use client";
import React from "react";
import useEpisodes from "@/hooks/useEpisodes";
import EpisodesTable from "@/components/EpisodesTable/EpisodesTable";
import Loading from "@/components/Loading/Loading";

const Home: React.FC = () => {
  const { apiEpisodes, currentPage, totalPages, handlePageChange, loading } =
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
            apiEpisodes={apiEpisodes}
            totalPagess={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
