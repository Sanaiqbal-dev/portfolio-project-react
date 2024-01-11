export interface TotalWorkExperience {
  years: number;
  months: number;
}

export interface WorkExperienceItemProps {
  _id?: string;
  companyName: string;
  startDate: string|Date;
  endDate: string|Date;
  isCurrentEmployer?: boolean;
  description: string;
}

export interface PictureSize {
    width: string;
    height: string;
  };