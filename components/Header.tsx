import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/" className="flex items-center ">
          <Image
            src="/assets/images/logo.png"
            alt="StockAlert"
            width={140}
            height={32}
            className="h-14 w-18 cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-white">StockAlert</h1>
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
