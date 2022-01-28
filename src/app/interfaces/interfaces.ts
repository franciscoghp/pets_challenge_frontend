export interface Owner {
    lastname: string;
    name: string;
}

export interface Pet {
  owner: string;
  owner_id: string;
  name: string;
  type: string;
}