export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  status: string;
  organizerId: string;
  organizer?: {
    name: string;
  };
}

export interface CreateActivityData {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}
