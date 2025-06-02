const Layout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
