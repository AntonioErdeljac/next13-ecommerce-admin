import React from 'react';
import { UserButton, auth } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

import styles from './sidebar.module.css';
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

import { MainNav } from "@/components/main-nav";
import { useParams, usePathname } from "next/navigation";

import { Home, 
    Sun, 
    Menu, 
    Flame, 
    LayoutTemplate,
    PanelTop
} from "lucide-react";

import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';

import Link from 'next/link';


const Sidebar = async () => {
    const showMenu = (headerToggle: string, navbarId: string) => {
        if (typeof document !== 'undefined') {
            const toggleBtn = document.getElementById(headerToggle);
            const nav = document.getElementById(navbarId);

            // Validate that variables exist
            if (toggleBtn && nav) {
                toggleBtn.addEventListener('click', () => {
                    // We add the show-menu class to the div tag with the nav__menu class
                    nav.classList.toggle('show-menu');
                    // change icon
                    toggleBtn.classList.toggle('bx-x');
                });
            }
        }
    };

    showMenu('header-toggle', 'navbar');

    const linkColor = typeof document !== 'undefined' ? document.querySelectorAll('.nav__link') : [];

    function colorLink(this: HTMLElement) {
        linkColor.forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
    }

    linkColor.forEach((l) => l.addEventListener('click', colorLink));

    const { userId } = auth();

    if (!userId) {
      redirect('/sign-in');
    }
  
    const stores = await prismadb.store.findMany({
      where: {
        userId,
      }
    });

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.header__container}>
                        <div className={styles.header__img}>
                            <div className="ml-auto flex items-center space-x-4">
                                <ThemeToggle />
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>

                        <a><StoreSwitcher items={stores} /></a>

                        {/* <div className={styles.header__search}>
                            <input type="search" placeholder="Search" className={styles.header__input} />
                            <i className={`bx bx-search ${styles.header__icon}`}></i>
                        </div> */}

                        <div className={styles.header__toggle}>
                            <i id="header-toggle"><Menu /></i>
                        </div>
                    </div>
                </header>

                <div className={styles.nav} id="navbar">
                    <nav className={styles.nav__container}>
                        <div className="nav" id="navbar">
                            <nav className="nav__container">
                                <div>
                                    <Link href="/:clientId" className={`${styles.nav__link} ${styles.nav__logo}`}
                                    >
                                        <i className={`${styles.nav__icon}`}><Flame /></i>
                                        <span className="nav__logo_name">{process.env.BRAND_NAME}</span>
                                    </Link>

                                    <div className={styles.nav__list}>
                                        <div className={styles.nav__items}>
                                            <div className="nav__link active">
                                                <span className="nav__name"><MainNav className="nav__links" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className={`${styles.nav__link} ${styles.nav__logout}`}>
                                    <i className={`${styles.bx} ${styles.bx_home} ${styles.nav__icon}`}></i>
                                    <span className={styles.nav__name}>logout</span>
                                </a>
                            </nav>
                        </div>

                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
