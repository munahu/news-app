"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { categoryNames } from "../categories";
import { Theme, ThemeContext } from "./ThemeProvider";

interface Props {
  heading: string;
}

interface MobileNavProps {
  heading: string;
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
}

export default function Nav({ heading }: Props) {
  const [isMobileNavDisplayed, setIsMobileNavDisplayed] = useState(false);
  const { theme, handleThemeChange } = useContext(ThemeContext);
  return (
    <nav className="font-sans flex justify-between items-center pt-6">
      {isMobileNavDisplayed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-8 lg:hidden w-6 h-6 cursor-pointer z-50"
          onClick={() => setIsMobileNavDisplayed(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-8 lg:hidden w-7 h-7 cursor-pointer"
          onClick={() => setIsMobileNavDisplayed(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      )}
      <Link className="font-semibold text-2xl" href={`/${heading}`}>
        {heading === "home" ? "news" : heading}
      </Link>
      {isMobileNavDisplayed && (
        <MobileNav
          heading={heading}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />
      )}
      <ul className="hidden lg:flex">
        <li>
          <Link
            href="/"
            className="p-2 ml-4 text-sm opacity-90 uppercase cursor-pointer"
          >
            Home
          </Link>
        </li>
        {categoryNames.map((categoryName, index) => (
          <li key={index}>
            <Link
              href={`/${categoryName}`}
              className="p-2 ml-4 text-sm opacity-90 uppercase cursor-pointer"
            >
              {categoryName}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block">
        <ToggleTheme theme={theme} handleThemeChange={handleThemeChange} />
      </div>
    </nav>
  );
}

function MobileNav({ heading, theme, handleThemeChange }: MobileNavProps) {
  return (
    <div className="lg:hidden absolute bg-white dark:bg-darkBlack inset-0 pt-20 pl-14 md:pl-20 tracking-tighter z-40 mobileNav">
      <ul className="flex flex-col">
        {heading !== "news" && (
          <li>
            <Link
              href="/"
              className="text-2xl uppercase py-4 flex items-center hover:line-through"
            >
              home
            </Link>
          </li>
        )}
        {categoryNames.map((categoryName, index) => (
          <li key={index}>
            <Link
              href={`/${categoryName}`}
              className="text-2xl uppercase py-4 flex items-center hover:line-through"
            >
              {categoryName}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-14">
        <ToggleTheme theme={theme} handleThemeChange={handleThemeChange} />
      </div>
    </div>
  );
}

function ToggleTheme({
  theme,
  handleThemeChange,
}: {
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
}) {
  return (
    <div className="flex items-center text-sm">
      <span className={`${theme === "dark" ? "opacity-45" : "opacity-100"}`}>
        Light
      </span>
      <span
        className="relative w-9 h-5 rounded-xl border border-lightBlack dark:border-white mx-2 px-0.5 flex items-center"
        onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
      >
        <span
          className={`absolute w-3 aspect-square rounded-full bg-lightBlack dark:bg-white duration-300 ease-in-out delay-100 ${
            theme === "dark" ? "translate-x-[18px]" : ""
          }`}
        />
      </span>
      <span className={`${theme === "dark" ? "opacity-100" : "opacity-45"}`}>
        Dark
      </span>
    </div>
  );
}
