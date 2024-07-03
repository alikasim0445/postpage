const Footer = () => {
  const date = new Date();
  return (
    <div className="grid place-items-center bg-blue-600 py-2 text-white">
      Copyright &copy; {date.getFullYear()}
    </div>
  );
};

export default Footer;
