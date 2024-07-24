export interface Character {
  id: number;
  name: string;
  status: string;
  type: string;
  species: string;
  gender: string;
  local: boolean;
}

export interface Episode {
  id: number;
  name: string;
  air_date: Date;
  episode: string;
}
