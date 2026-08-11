/**
 * ============================================
 * NAVBAR COMPONENT - Adaptado a la paleta del proyecto
 * ============================================
 * Barra de navegación principal con menú responsive y colores personalizados
 */

import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavigationBar = memo(() => {
  const { user, isAuthenticated, isAdmin, isAuxiliar, isCliente, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <Navbar sticky="top" className="custom-navbar shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand/Logo on the left */}
        <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
          <img 
            src="/gavat.png" 
            alt="GAVAT" 
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span>GAVAT</span>
        </Navbar.Brand>
        
        {/* Navigation links (Visible only on Desktop) */}
        <Nav className="me-auto d-none d-lg-flex">
          <Nav.Link as={Link} to="/" className="nav-link-custom">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/catalogo" className="nav-link-custom">Catálogo</Nav.Link>
          
          {(isAdmin || isAuxiliar) && (
            <NavDropdown title="Administración" id="admin-dropdown" className="nav-dropdown-custom">
              <NavDropdown.Item as={Link} to="/admin/dashboard">
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/categorias">
                Categorías
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/subcategorias">
                Subcategorías
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/productos">
                Productos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isAdmin && (
                <NavDropdown.Item as={Link} to="/admin/usuarios">
                  Usuarios
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link} to="/admin/facturas">
                <i className="bi bi-file-earmark-pdf me-2"></i>
                Facturas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin/pedidos">
                Pedidos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/comentarios">
                <i className="bi bi-chat-dots me-2"></i>
                Comentarios
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>

        {/* Right side links (Desktop: Cart + user dropdown. Mobile: just the circle menu) */}
        <div className="d-flex align-items-center">
          <Nav className="d-none d-lg-flex me-2">
            <Nav.Link as={Link} to="/carrito" className="nav-link-custom">
              <i className="bi bi-cart3 me-1"></i>
              Carrito
            </Nav.Link>

            {isAuthenticated && isCliente && (
              <Nav.Link as={Link} to="/mis-pedidos" className="nav-link-custom">
                <i className="bi bi-box-seam me-1"></i>
                Mis Pedidos
              </Nav.Link>
            )}
            
            {isAuthenticated && (isAdmin || isAuxiliar) && (
              <>
                <Nav.Link as={Link} to="/catalogo" className="nav-link-custom text-gold">
                  <i className="bi bi-shop me-1"></i>
                  Ver Tienda
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/mis-pedidos" className="nav-link-custom text-gold">
                  <i className="bi bi-box-seam me-1"></i>
                  Mis Pedidos
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Unauthenticated Circle Dropdown */}
          {!isAuthenticated && (
            <NavDropdown
              title={
                <div className="avatar-circle">
                  <i className="bi bi-person"></i>
                </div>
              }
              id="auth-dropdown"
              align="end"
              className="nav-dropdown-custom auth-dropdown-circle"
            >
              <NavDropdown.Item as={Link} to="/" className="d-lg-none">
                <i className="bi bi-house-door me-2"></i>
                Inicio
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/catalogo" className="d-lg-none">
                <i className="bi bi-grid me-2"></i>
                Catálogo
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/carrito" className="d-lg-none">
                <i className="bi bi-cart3 me-2"></i>
                Carrito
              </NavDropdown.Item>
              <NavDropdown.Divider className="d-lg-none" />

              <NavDropdown.Item as={Link} to="/login">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar Sesión
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">
                <i className="bi bi-person-plus me-2"></i>
                Registrarse
              </NavDropdown.Item>
            </NavDropdown>
          )}

          {/* Authenticated Circle Dropdown */}
          {isAuthenticated && (
            <NavDropdown
              title={
                <div className="avatar-circle authenticated-avatar">
                  {user?.nombre?.charAt(0).toUpperCase()}
                </div>
              }
              id="user-dropdown"
              align="end"
              className="nav-dropdown-custom auth-dropdown-circle"
            >
              <NavDropdown.Item as={Link} to="/" className="d-lg-none">
                <i className="bi bi-house-door me-2"></i>
                Inicio
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/catalogo" className="d-lg-none">
                <i className="bi bi-grid me-2"></i>
                Catálogo
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/carrito" className="d-lg-none">
                <i className="bi bi-cart3 me-2"></i>
                Carrito
              </NavDropdown.Item>
              
              {isCliente && (
                <NavDropdown.Item as={Link} to="/mis-pedidos" className="d-lg-none">
                  <i className="bi bi-box-seam me-2"></i>
                  Mis Pedidos
                </NavDropdown.Item>
              )}

              {(isAdmin || isAuxiliar) && (
                <>
                  <NavDropdown.Item as={Link} to="/catalogo" className="d-lg-none text-gold">
                    <i className="bi bi-shop me-2"></i>
                    Ver Tienda
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/mis-pedidos" className="d-lg-none text-gold">
                    <i className="bi bi-box-seam me-2"></i>
                    Mis Pedidos
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider className="d-lg-none" />
                  <NavDropdown.Header className="d-lg-none">Administración</NavDropdown.Header>
                  <NavDropdown.Item as={Link} to="/admin/dashboard" className="d-lg-none">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/categorias" className="d-lg-none">
                    Categorías
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/subcategorias" className="d-lg-none">
                    Subcategorías
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/productos" className="d-lg-none">
                    Productos
                  </NavDropdown.Item>
                  {isAdmin && (
                    <NavDropdown.Item as={Link} to="/admin/usuarios" className="d-lg-none">
                      Usuarios
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item as={Link} to="/admin/facturas" className="d-lg-none">
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Facturas
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/pedidos" className="d-lg-none">
                    Pedidos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/comentarios" className="d-lg-none">
                    <i className="bi bi-chat-dots me-2"></i>
                    Comentarios
                  </NavDropdown.Item>
                </>
              )}

              <NavDropdown.Divider className="d-lg-none" />
              <NavDropdown.Item as={Link} to="/perfil">
                <i className="bi bi-person me-2"></i>
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </Container>

      {/* Estilos personalizados usando las variables globales del proyecto */}
      <style jsx>{`
        .custom-navbar {
          background-color: var(--bg-negativo, #192847);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.75rem 0;
        }
        .brand-logo {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--fnt-light, #ffffff);
          text-decoration: none;
        }
        .brand-logo i {
          background: linear-gradient(135deg, var(--bs-gold, #f5c271), var(--bs-gold-dark, #c7984e));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .brand-logo span {
          background: linear-gradient(135deg, var(--bs-gold, #f5c271), var(--bs-gold-dark, #c7984e));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-link-custom {
          color: var(--fnt-light, #ffffff) !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          margin: 0 0.25rem;
        }
        .nav-link-custom:hover {
          color: var(--fnt-light, #ffffff) !important;
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }
        .text-gold {
          color: var(--bs-gold, #f5c271) !important;
        }
        /* Dropdown personalizado */
        .nav-dropdown-custom .dropdown-menu {
          border: none;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border-radius: 0.75rem;
          padding: 0.5rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 991.98px) {
          .nav-dropdown-custom .dropdown-menu {
            max-height: 75vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .nav-dropdown-custom .dropdown-menu::-webkit-scrollbar {
            width: 6px;
          }
          .nav-dropdown-custom .dropdown-menu::-webkit-scrollbar-track {
            background: transparent;
          }
          .nav-dropdown-custom .dropdown-menu::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 3px;
          }
          .nav-dropdown-custom .dropdown-menu::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
        }
        .nav-dropdown-custom .dropdown-item {
          border-radius: 0.5rem;
          padding: 0.625rem 1rem;
          transition: all 0.2s ease;
          color: var(--bg-negativo, #192847) !important;
        }
        .nav-dropdown-custom .dropdown-item:hover {
          background: linear-gradient(135deg, var(--bs-gold, #f5c271), var(--bs-gold-dark, #c7984e));
          color: var(--fnt-black, #000000) !important;
        }
        /* Estilos del Avatar Círculo */
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--bg-negativo, #192847), #2a3d66);
          border: 2px solid var(--bs-gold, #f5c271);
          color: var(--bs-gold, #f5c271);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        .avatar-circle:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(245, 194, 113, 0.2);
          background: linear-gradient(135deg, #2a3d66, var(--bg-negativo, #192847));
          color: var(--fnt-light, #ffffff);
        }
        .avatar-circle i {
          font-size: 1.25rem;
        }
        .authenticated-avatar {
          background: linear-gradient(135deg, var(--bs-gold, #f5c271), var(--bs-gold-dark, #c7984e));
          color: var(--bg-negativo, #192847) !important;
          border-color: var(--fnt-light, #ffffff);
        }
        .authenticated-avatar:hover {
          color: var(--fnt-light, #ffffff) !important;
          background: linear-gradient(135deg, var(--bs-gold-dark, #c7984e), var(--bs-gold, #f5c271));
        }
        /* Quitar la flecha del dropdown en todos los dropdowns del navbar */
        .custom-navbar .dropdown-toggle::after {
          display: none !important;
        }
        /* Eliminar estilos de link por defecto de Bootstrap para el toggle del avatar */
        .custom-navbar .auth-dropdown-circle .dropdown-toggle {
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
          display: flex;
          align-items: center;
          margin: 0 0.25rem;
          box-shadow: none !important;
          outline: none !important;
        }
        .custom-navbar .auth-dropdown-circle .dropdown-toggle:hover,
        .custom-navbar .auth-dropdown-circle .dropdown-toggle:focus,
        .custom-navbar .auth-dropdown-circle .dropdown-toggle:active,
        .custom-navbar .auth-dropdown-circle.show .dropdown-toggle {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        /* Estilos para el toggle de dropdowns estándar en el navbar */
        .custom-navbar .nav-dropdown-custom .dropdown-toggle {
          color: var(--fnt-light, #ffffff) !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          margin: 0 0.25rem;
          display: flex;
          align-items: center;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        .custom-navbar .nav-dropdown-custom .dropdown-toggle:hover,
        .custom-navbar .nav-dropdown-custom .dropdown-toggle:focus,
        .custom-navbar .nav-dropdown-custom .dropdown-toggle:active,
        .custom-navbar .nav-dropdown-custom.show .dropdown-toggle {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: var(--fnt-light, #ffffff) !important;
          box-shadow: none !important;
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </Navbar>
  );
});

NavigationBar.displayName = 'NavigationBar';

export default NavigationBar;