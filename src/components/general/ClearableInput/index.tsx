import { CloseButton, Input } from "@mantine/core";
import { useState } from "react";

export default function (props) {
    const { placeholder, label } = props
    const [value, setValue] = useState('');

    return (
        <>
            <Input.Wrapper label={label}>
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