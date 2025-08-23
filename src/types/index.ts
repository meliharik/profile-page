export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface MediumPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  content: string;
  categories: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  companyColor?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  links?: {
    type: 'github' | 'appstore' | 'medium' | 'external';
    url: string;
    label: string;
  }[];
  badge?: {
    text: string;
    type: 'award' | 'date';
  };
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  gpa?: string;
  logo: string;
  institutionColor: string;
}

export interface PresentationItem {
  title: string;
  event: string;
  date: string;
  description: string;
  image: string;
  technologies: string[];
  attendees?: string;
  link?: {
    type: 'youtube' | 'spotify' | 'external';
    url: string;
    label: string;
  };
} 