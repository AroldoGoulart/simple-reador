import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { bgCard, hoverDefault, textDark } from "../../utils/styles";
import Logo from "../../public/logo.png";
function Header() {
  const Menus = useMemo(
    () => [
      {
        title: "Criar Árvore",
        link: `/`,
      },
      {
        title: "Criar Perceptron",
        link: "/perceptron",
      },
    ],
    []
  );

  return (
    <nav className={`${bgCard} mb-4`}>
      <div className="flex max-w-screen-xl px-4 mx-auto md:items-center sm:px-6 lg:px-8 z-20 py-3 ">
        <Link className={`${hoverDefault} hover:opacity-70`} href="/">
          <Image
            alt="logo"
            src={Logo}
            height={40}
            className="cursor-pointer object-cover"
            width={60 * 2.3}
          />
        </Link>

        <div className="flex flex-grow items-center px-4">
          <div className="flex flex-1 flex-row">
            {Menus.map((menu) => (
              <Link
                className={`${textDark} ${hoverDefault} hover:opacity-70 justify-center text-center px-4 mx-2`}
                key={menu.title}
                href={menu.link}
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Header };
