import React from "react";
import { Group, Code, Image, useComputedColorScheme } from "@mantine/core";
import { IconSettings, IconHome, IconSchool, IconUsers, IconPackages, IconChartBar, IconFileAnalytics, IconTruckDelivery, IconTruckReturn, IconBox, IconToolsKitchen2 } from "@tabler/icons-react";
import classes from "./NavBar.module.css";
import { usePathname } from "next/navigation";

const data = {
  "escola": [
    { link: "/NaMedidaUI/escola/turmas", label: "Turmas", icon: IconUsers },
    { link: "/NaMedidaUI/escola", label: "Refeições", icon: IconToolsKitchen2 },
    { link: "/NaMedidaUI/escola/pedido", label: "Pedido", icon: IconTruckDelivery },
    { link: "/NaMedidaUI/escola/relatorios", label: "Relatorios", icon: IconFileAnalytics },
  ],
  departamento: [
    { link: "/NaMedidaUI/departamento/dashboards", label: "Dashboards", icon: IconChartBar },
    { link: "/NaMedidaUI/departamento/escolas", label: "Escolas", icon: IconSchool },
    { link: "/NaMedidaUI/departamento/produtos", label: "Produtos", icon: IconBox },
    { link: "/NaMedidaUI/departamento/estoque", label: "Estoque", icon: IconPackages },
    { link: "/NaMedidaUI/departamento/relatorios", label: "Relatórios", icon: IconFileAnalytics },
    { link: "/NaMedidaUI/departamento/pedidos", label: "Pedidos", icon: IconTruckReturn },
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
          src={computedColorScheme === "dark" ? "logoDark.png" : "logo.png"}
          w={'8rem'}
        />
        <Code fw={700}>v0.9.5</Code>
      </Group>
    </>
  );
}
