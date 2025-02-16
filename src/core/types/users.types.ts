export interface ApiParams {
  results?: number;
  nat?: string;
}
export interface ApiResponse {
  results: UsersData[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface UsersData {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface UsersStatistics {
  id: string;
  label: string;
  value: number;
}

export interface UsersMappingResults {
  availableCountries: string[];
  statistics: UsersStatistics[];
}
