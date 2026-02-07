export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl?: string;
  pdfUrl?: string;
  uploaderId: string;
  createdAt: string;
  uploader?: {
    id: string;
    name: string;
  };
}

export interface CreateBookData {
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl?: string;
  pdfUrl?: string;
}
