import { Users, GraduationCap, Briefcase, Code, Presentation, FileText, BookOpenCheck, Mail } from 'lucide-react';
import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  { id: 'about', label: 'About Me', icon: Users },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'presentations', label: 'Presentations', icon: Presentation },
  { id: 'blogs', label: 'Blog Posts', icon: FileText },
  { id: 'papers', label: 'Academic Papers', icon: BookOpenCheck },
  { id: 'contact', label: 'Contact', icon: Mail },
]; 