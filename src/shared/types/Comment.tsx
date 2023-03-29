export interface CreateComment {
  name: string;
  body: string;
}

export interface Comment extends CreateComment {
  id: number;
}
