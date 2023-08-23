"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";
import styles from './sidebar.module.css';

import { Home,
  Settings, 
  Package2,
  Sparkles,
  PanelTop,
  Ruler,
  Palette,
  Folder,
  Code2
} from "lucide-react";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Home />
              </i>
            <span className="nav__name">Overview</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
            <PanelTop />
              </i>
            <span className="nav__name">billboards</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Sparkles />
              </i>
            <span className="nav__name">categories</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Ruler />
              </i>
            <span className="nav__name">sizes</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Palette />
              </i>
            <span className="nav__name">colors</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Folder />
              </i>
            <span className="nav__name">products</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Package2 />
              </i>
            <span className="nav__name">orders</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/api`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Code2 />
              </i>
            <span className="nav__name">Developers</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/api`,
    },
    {
      href: `/${params.storeId}/settings`,
      label:(
        <>
          <div className="nav__link active">
            <i className="nav__icon">
              <Settings />
              </i>
            <span className="nav__name">settings</span>
          </div>
        </>
      ),
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex flex-col items-left space-x-10 lg:space-x-0", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          style={{width: '100% !important'}}
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors rounded-md w-full pt-3 pb-3 hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};

// export const mainNavRoutes = routes;
