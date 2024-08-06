import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from 'framer-motion';
import { useSidebar } from "./sidebar";

export const ClientSidebarLink = ({
    link,
    label,
    icon,
    className
  }: {
    link: string;
    label: string;
    icon: React.JSX.Element | React.ReactNode;
    className?: string;
  }) => {
    const open = true
    const animate = true;
    return (
      <Link
        href={link}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
          className
        )}
        //onClick={()=>setOpen(false)}
      >
        {icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-700 dark:text-neutral-200 text-base group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {label}
        </motion.span>
      </Link>
    );
  };
  