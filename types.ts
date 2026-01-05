export interface NavItem {
  label: string;
  href: string;
  image?: string; // Placeholder for mega-menu thumbnail
}

export enum AppState {
  IGNITION = 'IGNITION',
  RUNNING = 'RUNNING'
}

export interface ScrollState {
  progress: number;
  velocity: number;
}