export interface Contributor {
  id: number;
  name: string;
  uid: string;
  speciality: string;
  classId: string;
  role: 'Maintainer' | 'Contributor';
  contributions: string[];
  gender?: 'male' | 'female' | 'non-binary';
  contact?: string;
  profilePhoto?: string;
}