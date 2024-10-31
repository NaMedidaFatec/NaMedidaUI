import React from "react";
import { Group, Code, Image, useComputedColorScheme } from "@mantine/core";
import { IconSettings, IconHome, IconSchool, IconUsers, IconPackages, IconChartBar, IconFileAnalytics, IconTruckDelivery, IconTruckReturn } from "@tabler/icons-react";
import classes from "./NavBar.module.css";
import { usePathname } from "next/navigation";

const data = {
  "escola": [
    { link: "/escola", label: "Home", icon: IconHome },
    { link: "/escola/turmas", label: "Turmas", icon: IconUsers },
    { link: "/escola/pedido", label: "Pedido", icon: IconTruckDelivery },
    { link: "/escola/relatorios", label: "Relatorios", icon: IconFileAnalytics },
    { link: "/escola/settings", label: "Configurações", icon: IconSettings },
  ],
  departamento: [
    { link: "/departamento", label: "Home", icon: IconHome },
    { link: "/departamento/escolas", label: "Escolas", icon: IconSchool },
    { link: "/departamento/estoque", label: "Estoque", icon: IconPackages },
    { link: "/departamento/pedidos", label: "Pedidos", icon: IconTruckReturn },
    { link: "/departamento/dashboards", label: "Dashboards", icon: IconChartBar },
  ],
};

export default function NavBar() {
  const pathname = usePathname();
  const firstSegment = pathname ? pathname.split("/")[1] : "escola";

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
