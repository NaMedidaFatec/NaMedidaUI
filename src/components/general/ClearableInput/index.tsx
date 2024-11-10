import { CloseButton, Input } from "@mantine/core";
import { useState } from "react";

interface ComponentProps {
    placeholder?: string;
    label?: string;
    value: string;
    setValue: (e) => void;
    required?: boolean;
}

export default function ({ placeholder, label, value, setValue ,required = false }: ComponentProps) {
    return (
        <>
            <Input.Wrapper label={label} required={required}>
                <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    rightSectionPointerEvents="all"
                    rightSection={
                        <CloseButton
                            aria-label="Limpar"
                            onClick={() => setValue('')}
                            style={{ display: value ? undefined : 'none' }}
                        />
                    }
                />
            </Input.Wrapper>
        </>
    );
}