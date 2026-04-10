"use client"

import React, { useEffect, useState, useRef } from "react";
import style from "./navbar.module.css";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { getMe, logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

type NavbarVariant = "home" | "internal";

type UserRole = "consultor" | "estudiante" | "emprendedor" | "administrador" | "empresa" | "institucion";

interface MenuItem {
    label: string;
    href: string;
}

const menuByRole: Record<UserRole, MenuItem[]> = {
  consultor: [
    { label: "Perfil", href: "/profile" },
    { label: "Proyectos", href: "/projects" },
    { label: "Notificaciones", href: "/notifications" }
  ],
  estudiante: [
    { label: "Perfil", href: "/profile" },
    { label: "Proyectos", href: "/projects" },
    { label: "Mis proyectos", href: "/myprojects" },
    { label: "Notificaciones", href: "/notifications" },
    { label: "Cursos", href: "/courses"}
  ],
  emprendedor: [
    { label: "Perfil", href: "/profile" },
    { label: "Emprendimiento", href: "/venture" },
    { label: "Mis emprendimientos", href: "/myventures" },
    { label: "Notificaciones", href: "/notifications" },
  ],
  administrador: [
    { label: "Perfil", href: "/profile" },
    { label: "Usuarios", href: "/users" },
    { label: "Proyectos", href: "/projects" },
    { label: "Emprendimientos", href: "/ventures"},
    { label: "Panel admin", href: "/admin" }
  ],
  empresa: [
    { label: "Perfil", href: "/profile" },
    { label: "Proyectos", href: "/projects" },
    { label: "Notificaciones", href: "/notifications" }
  ],
  institucion: [
    { label: "Perfil", href: "/profile" },
    { label: "Proyectos", href: "/projects" },
    { label: "Notificaciones", href: "/notifications" }
  ]
};

const navLinksByVariant: Record<NavbarVariant, MenuItem[]> = {
  home: [
    { label: "Plataforma", href: "#plataforma" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" }
  ],
  internal: [
    { label: "Inicio", href: "/" }
  ],
};

export default function Navbar({ variant = "home"}:{variant?: NavbarVariant}) {

    const navLinks = navLinksByVariant[variant];
    
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user, loading, setUser } = useAuth();

    const role = user?.usuario?.rol as UserRole | undefined;
    const menuItems = role ? menuByRole[role] : [];

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
                
                <div className={style.logoContainer}>
                    <div className={style.logoIcon}>
                    <span>I</span>
                    </div>
                    <div>
                    <div className={style.logoTitle}>IngeniCCa</div>
                    <div className={style.logoSubtitle}>
                        Plataforma de Innovación
                    </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className={style.navDesktop}>
                    {navLinks.map((link) => (
                        <Link key = {link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                    {user ? (
                        <div className={style.userMenu} ref={menuRef}>
                            <button className={style.userButton} onClick={() => setIsDropdownOpen(prev => !prev)}>
                                {user.usuario.nombres}
                            </button>

                            {isDropdownOpen && (
                            <div className={style.dropdown}>
                                {menuItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    {item.label}
                                </Link>
                                ))}
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
                    <Link href="/login" className={style.ctaButton}>
                        Acceder
                    </Link>
                    )}
                </nav>

                <button
                    className={style.mobileButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                </div>

                {isMobileMenuOpen && (
                <div className={style.mobileMenu}>
                    <nav className={style.mobileNav}>
                    {navLinks.map((link) => (
                        <Link key = {link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                    {user ? (
                        <>
                        <div className={style.divider}></div>
                        <div className={style.mobileUserSection}>
                            <span className={style.mobileUsername}>{user.usuario.nombres}</span>
                            {menuItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    {item.label}
                                </Link>
                            ))}
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
                        <Link href="/login" className={style.ctaButton}>
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
