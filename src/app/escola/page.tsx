"use client";

import React, { useEffect } from "react";
import { useUpdateTitle } from "../../hooks/useTitle";

export default function InstituicaoEnsinoHomePage(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle('Tela Inicial')
  }, [])

  return <>Tela Inicial do usuário Instituição de ensino</>;
}
