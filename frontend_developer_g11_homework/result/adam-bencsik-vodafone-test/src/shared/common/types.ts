export type Name = {
  title: string;
  first: string;
  last: string;
};

export type Dob = {
  age: number;
  date: Date;
};

export type ID = {
  name: string;
  value: string;
};

export type Login = {
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  uuid: string;
};

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type Registered = {
  age: number;
  date: Date;
};

export type Street = {
  name: string;
  number: number;
};

export type Timezone = {
  description: string;
  offset: string;
};

export type Coordinates = {
  latitude: string;
  longtitude: string;
};

export type Location = {
  city: string;
  country: string;
  postcode: number;
  state: string;
  street: Street;
  timezone: Timezone;
  coordinates: Coordinates;
};

export type ContactType = {
  cell: string;
  dob: Dob;
  email: string;
  gender: string;
  id: ID;
  location: Location;
  login: Login;
  name: Name;
  nat: string;
  phone: string;
  picture: Picture;
  registered: Registered;
};
