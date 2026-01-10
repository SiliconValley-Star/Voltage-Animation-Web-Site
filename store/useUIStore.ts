import { create } from 'zustand';

// Blog State Interface
interface BlogState {
    scrollY: number;
    activeCategory: string;
    searchQuery: string;
    isHydrated: boolean;
}

// Projects State Interface
interface ProjectsState {
    scrollY: number;
    isHydrated: boolean;
}

// Services State Interface
interface ServicesState {
    scrollY: number;
    isHydrated: boolean;
}

// Main Store Interface
interface UIStore {
    blog: BlogState;
    projects: ProjectsState;
    services: ServicesState;
    
    // Blog Actions
    setBlogState: (state: Partial<BlogState>) => void;
    resetBlogState: () => void;
    
    // Projects Actions
    setProjectsState: (state: Partial<ProjectsState>) => void;
    resetProjectsState: () => void;
    
    // Services Actions
    setServicesState: (state: Partial<ServicesState>) => void;
    resetServicesState: () => void;
}

// Default States
const defaultBlogState: BlogState = {
    scrollY: 0,
    activeCategory: 'TÜMÜ',
    searchQuery: '',
    isHydrated: false,
};

const defaultProjectsState: ProjectsState = {
    scrollY: 0,
    isHydrated: false,
};

const defaultServicesState: ServicesState = {
    scrollY: 0,
    isHydrated: false,
};

// Zustand Store
export const useUIStore = create<UIStore>((set) => ({
    // Initial States
    blog: defaultBlogState,
    projects: defaultProjectsState,
    services: defaultServicesState,
    
    // Blog Actions
    setBlogState: (newState) =>
        set((state) => ({
            blog: { ...state.blog, ...newState },
        })),
    
    resetBlogState: () =>
        set(() => ({
            blog: defaultBlogState,
        })),
    
    // Projects Actions
    setProjectsState: (newState) =>
        set((state) => ({
            projects: { ...state.projects, ...newState },
        })),
    
    resetProjectsState: () =>
        set(() => ({
            projects: defaultProjectsState,
        })),
    
    // Services Actions
    setServicesState: (newState) =>
        set((state) => ({
            services: { ...state.services, ...newState },
        })),
    
    resetServicesState: () =>
        set(() => ({
            services: defaultServicesState,
        })),
}));