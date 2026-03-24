"use client"

import React, { useEffect, useState, useRef } from "react";
import style from "./navbar.module.css";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { getMe, logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [user, setUser] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const obtenerUsuario = async () => {
            const data = await getMe();
            if(data?.user){
                setUser(data.user);
            }else{
                setUser(null);
            }
        };
        obtenerUsuario();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
            ) {
            setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await logout();

        setUser(null);
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);

        router.push("/");
        router.refresh();
    };

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
                    <span>I</span>
                    </div>
                    <div>
                    <div className={style.logoTitle}>Ingenia</div>
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

                    {user ? (
                        <div className={style.userMenu} ref={menuRef}>
                            <button className={style.userButton} onClick={() => setIsDropdownOpen(prev => !prev)}>
                                {user.name || user.nombres}
                            </button>

                            {isDropdownOpen && (
                                <div className={style.dropdown}>
                                <Link href="/perfil">Perfil</Link>
                                <Link href="/proyectos">Proyectos</Link>
                                <Link href="/notificaciones">Notificaciones</Link>
                                <button
                                    type="button"
                                    className={style.logoutButton}
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                                </div>
                            )}
                        </div>
                    ):(
                    <Link href="/auth" className={style.ctaButton}>
                        Acceder
                    </Link>
                    )}
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
                    {user ? (
                        <>
                        <div className={style.divider}></div>
                        <div className={style.mobileUserSection}>
                            <span className={style.mobileUsername}>{user.name || user.nombres}</span>
                            <Link href="/perfil">Perfil</Link>
                            <Link href="/proyectos">Proyectos</Link>
                            <Link href="/notificaciones">Notificaciones</Link>
                            <button
                            type="button"
                            className={style.logoutButton}
                            onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                        </>
                    ) : (
                        <Link href="/auth" className={style.ctaButton}>
                            Acceder
                        </Link>
                    )}
                    </nav>
                </div>
                )}
            </div>
        </header>
    )
}
