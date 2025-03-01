interface IQuestion {
  description: string;
  id: number;
  image: string;
  options: Option[];
  playlist: string;
  question: string;
  type: string;
  user: User;
}

interface User {
  avatar: string;
  name: string;
}

interface Option {
  answer: string;
  id: string;
}
