'use client'

import { Blog } from '@/lib/helper/types';
import { createContext, useContext, useState, FC, ReactNode} from 'react';

interface BlogContextProps{
    blog: Blog | null;
    setBlog : (blog: Blog) => void;
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const BlogProvider: FC<{children: ReactNode}> = ({children}) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    return (
        <BlogContext.Provider value={{blog, setBlog}}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context){
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};