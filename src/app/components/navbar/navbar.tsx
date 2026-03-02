"use client"

import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <header
        className={`${style.header} ${
            isScrolled ? style.scrolled : ""
        }`}
        >
            <div className={style.container}>
                <div className={style.inner}>
                
                {/* Logo */}
                <div className={style.logoContainer}>
                    <div className={style.logoIcon}>
                    <span>N</span>
                    </div>
                    <div>
                    <div className={style.logoTitle}>Nexus-Qro</div>
                    <div className={style.logoSubtitle}>
                        Plataforma de Innovación
                    </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className={style.navDesktop}>
                    <a href="#plataforma">Plataforma</a>
                    <a href="#servicios">Servicios</a>
                    <a href="#nosotros">Nosotros</a>
                    <a href="#contacto">Contacto</a>
                    <Link href="/auth" className={style.ctaButton}>
                        Acceder
                    </Link>
                </nav>

                {/* Mobile Button */}
                <button
                    className={style.mobileButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
            <div className={style.mobileMenu}>
                <nav className={style.mobileNav}>
                <a href="#plataforma">Plataforma</a>
                <a href="#servicios">Servicios</a>
                <a href="#nosotros">Nosotros</a>
                <a href="#contacto">Contacto</a>
                <Link href="/auth" className={style.ctaButton}>
                    Acceder
                </Link>
                </nav>
            </div>
            )}
        </div>
        </header>
    )
}
