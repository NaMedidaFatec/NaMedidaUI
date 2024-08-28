import React from "react";
import { Group, Code } from "@mantine/core";
import { IconSettings, Icon2fa, IconDatabaseImport } from "@tabler/icons-react";
import classes from "./drawer.module.css";
import { usePathname } from "next/navigation";

const data = {
  "instituicao-ensino": [
    { link: "/instituicao-ensino", label: "Home", icon: IconDatabaseImport },
    { link: "/instituicao-ensino/pedido", label: "Pedido", icon: Icon2fa },
    { link: "/instituicao-ensino/settings", label: "Configurações", icon: IconSettings },
  ],
  admin: [
    { link: "/admin", label: "Home", icon: IconDatabaseImport },
    { link: "/admin/escolas", label: "Escolas", icon: Icon2fa },
    { link: "/admin/settings", label: "Solicitações de suprimentos", icon: IconSettings },
  ],
};

export default function Drawer() {
  const pathname = usePathname();
  const firstSegment = pathname ? pathname.split("/")[1] : "instituicao-ensino";


  const links = data[firstSegment] && data[firstSegment].map((item) => (
    <a
      className={classes.link}
      data-active={pathname === item.link || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          Na Medida
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
