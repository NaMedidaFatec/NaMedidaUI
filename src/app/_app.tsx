"use client";

import {
  ActionIcon,
  AppShell,
  Burger,
  Grid,
  Text,
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
        return router.push("/escola");
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
              layout="alt"
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              }}
              padding="md"
            >
              <AppShell.Header bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-6)' : '#fff'}>
                <Grid align="center" className={classes.header}>
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Grid.Col span={6} pl='1.5rem' >
                    <Text
                      mt='xs'
                      size="2rem"
                      fw={700}
                      variant="gradient"
                      gradient={{ from: '#e67d22', to: '#e3c7af', deg: 180 }}
                    >
                      {currentTitle}
                    </Text>
                  </Grid.Col>
                  <Grid.Col
                    span={6}
                    pr='1rem'
                    display='flex'
                    style={{ justifyContent: "flex-end" }} >
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
              <AppShell.Navbar
                p="md"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-6)' : '#fff'}>
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
