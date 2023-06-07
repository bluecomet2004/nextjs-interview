export interface User {
  cell: string;
  dob: {
    age: number;
    date: Date;
  }
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  }
  location: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    }
    country: string;
    postcode: number;
    state: string;
    street: {
      name: string;
      number: number;
    }
    timezone: {
      description: string;
      offset: string;
    }
  }
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  }
  name: {
    first: string;
    last: string;
    title: string;
  }
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  }
  registered: {
    age: number;
    date: Date;
  }
}

export interface Profile {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  }
  results: User[];
}