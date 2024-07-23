"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../services/api";
import { TableCharacter } from "@/components/table/TableCharacter";

interface Character {
  id: string;
  gender: number;
  status: string;
  species: string;
  name: string;
  data: object;
}

const ListPage = () => {
  return (
    <div>
      <TableCharacter />
    </div>
  );
};

export default ListPage;
