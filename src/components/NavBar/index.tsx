import React from "react";
import { Group, Code, Image, useComputedColorScheme } from "@mantine/core";
import { IconSettings, Icon2fa, IconDatabaseImport, IconSchool, IconUsers, IconPackages, IconChartBar, IconFileAnalytics } from "@tabler/icons-react";
import classes from "./NavBar.module.css";
import { usePathname } from "next/navigation";

const data = {
  "instituicao-ensino": [
    { link: "/instituicao-ensino", label: "Home", icon: IconDatabaseImport },
    { link: "/instituicao-ensino/turmas", label: "Turmas", icon: IconUsers },
    { link: "/instituicao-ensino/pedido", label: "Pedido", icon: Icon2fa },
    { link: "/instituicao-ensino/relatorios", label: "Relatorios", icon: IconFileAnalytics },
    { link: "/instituicao-ensino/settings", label: "Configurações", icon: IconSettings },
  ],
  departamento: [
    { link: "/departamento", label: "Home", icon: IconDatabaseImport },
    { link: "/departamento/escolas", label: "Escolas", icon: IconSchool },
    { link: "/departamento/estoque", label: "Estoque", icon: IconPackages },
    { link: "/departamento/dashboards", label: "Dashboards", icon: IconChartBar },
    { link: "/departamento/settings", label: "Solicitações de suprimentos", icon: IconSettings },
  ],
};

export default function NavBar() {
  const pathname = usePathname();
  const firstSegment = pathname ? pathname.split("/")[1] : "instituicao-ensino";

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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
    <>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <Group className={classes.footer} justify="space-between">
        <Image
          src={computedColorScheme === "dark" ? "/logoDark.png" : "/logo.png"}
          w={'8rem'}
        />
        <Code fw={700}>v0.0.3</Code>
      </Group>
    </>
  );
}
