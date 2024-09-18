"use client";

import {
  ActionIcon,
  AppShell,
  Burger,
  Grid,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import NavBar from "../components/NavBar";
import {
  IconSun,
  IconMoon,
  IconBellRinging,
  IconLogout,
} from "@tabler/icons-react";
import cx from "clsx";
import classes from "./app.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "../components/general";
import Loading from "../components/loading";
import { useCurrentTitle } from "../hooks/useCurrentTitle";

function Application({ children, ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const { isLoggedIn, user, signout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && router) {
      if (pathname == "/login") {
        if (user.isAdmin) {
          return router.push("/admin");
        }
        return router.push("/instituicao-ensino");
      }
      return router.push(pathname);
    }
    setLoading(false);
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
  }, [user, router]);

  const [opened, { toggle }] = useDisclosure();
  const currentTitle = useCurrentTitle();
  return (
    <Suspense fallback={<Loading />}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isLoggedIn ? (
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              }}
              padding="md"
            >
              <AppShell.Header>
                <Grid align="center" className={classes.header}>
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Grid.Col span={6}>
                    {/* <Title size="xl" weight={700}>    //Acho que isso poderia ser uma notificação né
                      Seja bem-vindo {user.username}!
                    </Title> */}
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Title>{currentTitle}</Title>
                  </Grid.Col>
                  <Grid.Col
                    span={2}
                    style={{
                      display: 'flex',
                      justifyContent: "flex-end",
                      paddingRight: '1rem'
                    }}
                  >
                    <Grid>
                      <Grid.Col span={4} >
                        <ActionIcon
                          onClick={() =>
                            setColorScheme(
                              computedColorScheme === "light" ? "dark" : "light"
                            )
                          }
                          variant="default"
                          size="xl"
                        >
                          {computedColorScheme === "light" ? (
                            <IconMoon
                              className={cx(classes.icon, classes.dark)}
                              stroke={1.5}
                            />
                          ) : (
                            <IconSun
                              className={cx(classes.icon, classes.light)}
                              stroke={1.5}
                            />
                          )}
                        </ActionIcon>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <ActionIcon
                          onClick={() => { }}
                          variant="default"
                          size="xl"
                        >
                          <IconBellRinging
                            className={cx(classes.icon, classes.dark)}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <ActionIcon
                          onClick={signout}
                          variant="default"
                          size="xl"
                        >
                          <IconLogout
                            className={cx(classes.icon, classes.dark)}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </AppShell.Header>
              <AppShell.Navbar p="md">
                <NavBar />
              </AppShell.Navbar>
              <AppShell.Main className={classes.main}>{children}</AppShell.Main>
            </AppShell>
          ) : (
            children
          )}
        </>
      )}
    </Suspense>
  );
}

export default Application;
