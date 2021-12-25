export default interface Job {
  id: string;
  title: string;
  location: string;
  company: string;
  companyRate: number;
  publicationDate: string;
  description: string;
  salary: number;
  responsabilities: string[];
  requierements: string[];
}
