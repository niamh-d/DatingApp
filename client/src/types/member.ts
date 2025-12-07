export type Member = {
  id: string;
  displayName: string;
  email: string;
  description?: string;
  gender: string;
  dateOfBirth: string;
  imageUrl?: string;
  city: string;
  country: string;
  created: string;
  lastActive: string;
};

export type Photo = {
  id: number;
  url: string;
  publicId?: string;
  memberId: number;
};

export type EditableMember = {
  displayName: string;
  description?: string;
  city: string;
  country: string;
};
