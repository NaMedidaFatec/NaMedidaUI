import { Input } from '@mantine/core';
import { useEffect, useState } from 'react';

interface ComponentProps {
    required?: boolean;
    name?: string;
    label?: string;
    description?: string;
    placeholder?: string;
    value?: string;
    setValue?: (e: string) => void;
}

export default function DateInput({ required, name, label, description, placeholder, value, setValue }: ComponentProps) {
    const [formattedDate, setFormattedDate] = useState(value || "");

    useEffect(() => {
        formatarData(value);
    }, [value]);

    const formatarData = (input: string) => {
        if (input) {
            let dateParts = input.split("-"); // Separa a string pelo "-"
            let formattedInput = ""

            if (dateParts.length === 3) {
                // formata a data no formato dd/mm/yyyy
                formattedInput = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                setFormattedDate(formattedInput);
            } else {
                dateParts = input.split("/");
                formattedInput = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                setValue(formattedInput);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event?.currentTarget?.value?.replace(/\D/g, ""); // Remove qualquer caracter q nao seja numero

        if (input.length <= 2) {
            input = input.replace(/(\d{2})(\d{0,2})/, "$1/$2");
        } else if (input.length <= 4) {
            input = input.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
        } else {
            input = input.slice(0, 8);
            input = input.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
        }

        let day = input.slice(0, 2);
        let month = input.slice(3, 5);
        let year = input.slice(6, 10);

        if (Number(day) > 31) {
            input = `${"31"}/${month}/${year}`;
        }

        if (Number(month) > 12) {
            input = `${day}/${"12"}/${year}`;
        }

        setFormattedDate(input);

        // Formata o input do usuario para yyyy-mm-dd novamente apos terminar de digitar
        if (input.length === 10) {
            const day = input.slice(0, 2);
            const month = input.slice(3, 5);
            const year = input.slice(6, 10);
            const formattedValue = `${year}-${month}-${day}`;
            setValue(formattedValue);
        }
    };

    return (
        <Input.Wrapper label={label} description={description} required={required}>
            <Input
                name={name}
                placeholder={placeholder}
                value={formattedDate}
                onChange={handleChange}
                maxLength={10}
            />
        </Input.Wrapper>
    );
}
