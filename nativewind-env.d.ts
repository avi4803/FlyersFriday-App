/// <reference types="nativewind/types" />

declare module '*.css';

declare module 'lucide-react-native' {
  import { FC } from 'react';
  import { ViewProps } from 'react-native';

  export interface LucideProps extends ViewProps {
    size?: number | string;
    color?: any;
    fill?: string;
    strokeWidth?: number | string;
    className?: string;
  }
  
  export type LucideIcon = FC<LucideProps>;

  export const Heart: LucideIcon;
  export const Share2: LucideIcon;
  export const MapPin: LucideIcon;
  export const Eye: LucideIcon;
  export const Calendar: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Store: LucideIcon;
  export const Compass: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Plus: LucideIcon;
  export const Bell: LucideIcon;
  export const User: LucideIcon;
  export const Search: LucideIcon;
  export const X: LucideIcon;
  export const Upload: LucideIcon;
  export const Send: LucideIcon;
  export const Tag: LucideIcon;
  export const Sparkles: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const Settings: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const Image: LucideIcon;
  export const Navigation: LucideIcon;
  export const Layers: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Sliders: LucideIcon;
  export const Bookmark: LucideIcon;
  export const MoreHorizontal: LucideIcon;
  export const Phone: LucideIcon;
  export const Home: LucideIcon;
  export const Map: LucideIcon;
  export const Flame: LucideIcon;
  export const Star: LucideIcon;
  export const ReceiptPercent: LucideIcon;
  export const Info: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const BellRing: LucideIcon;
  export const LogOut: LucideIcon;
}
