import { Link, useNavigate } from "react-router-dom";
import { Menu, IconButton } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const navLinks = [
    { label: "Pytania zamknięte", path: "/closed-questions" },
    { label: "Pytania otwarte", path: "/open-questions" },
    { label: "Mix", path: "/questions-mix" },
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 6rem",
        backgroundColor: "#f9f9f9",
        fontFamily: "Segoe UI, sans-serif",
        flexWrap: "wrap",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
          alt="UK Flag"
          style={{ width: "28px", height: "18px", borderRadius: "2px" }}
        />
        <h1 style={{ margin: 0, fontSize: "1.0rem", color: "#00247d" }}>
          Angielszczyzna
        </h1>
      </Link>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton aria-label="Open menu" variant="ghost" size={"sm"}>
            <FaChevronDown />
          </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            {navLinks.map((link) => (
              <Menu.Item
                key={link.path}
                onClick={() => navigate(link.path)}
                value={link.label}
              >
                {link.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </header>
  );
};

export default Header;
