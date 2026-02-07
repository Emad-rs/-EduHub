export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  creatorId: string;
  questions?: Question[];
  creator?: {
    name: string;
  };
}
