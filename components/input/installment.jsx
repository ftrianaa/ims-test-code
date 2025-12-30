"use client";

import api from "@/lib/api";
import { toaster } from "@/components/ui/toaster";
import { Button, Field, FieldLabel, Fieldset, Input, Stack } from "@chakra-ui/react"
import { useState } from "react";

export default function InputInstallment() {
    const [data, setData] = useState({})

    const handleSubmit = async () => {
        try {
            const payload = {
                client_name: data.client_name,
                otr: parseFloat(data.otr),
                tenor: parseInt(data.tenor),
                dp: parseFloat(data.dp)
            }
            console.log(payload, 'ini payloas')
            const result = await api.post("/api/contract", payload)

            console.log("data has been saved with result: ", result.data)
            toaster.success({
                title: "Success",
                description: "Contract has been created",
            });
        } catch (error) {
            toaster.error({
                title: "Error",
                description: "Error for creating the contract",
            });
            console.log("error handling submit for contract: ", error);
        }
    }

    return (
        <Stack w={'100vw'} align={'center'} justify={'center'}>
            <Fieldset.Root size="lg" maxW="md">
                <Stack gap={4}>
                    <Field.Root>
                        <FieldLabel>Client Name</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, client_name: e.target.value })} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>OTR</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, otr: e.target.value })} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>DP (% OTR)</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, dp: e.target.value })} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>Tenor (month)</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, tenor: e.target.value })} />
                    </Field.Root>
                    <Button
                        type="submit"
                        alignSelf="flex-start"
                        onClick={handleSubmit}
                        variant={'solid'}
                        colorPalette={'gray'}
                    >
                        Submit
                    </Button>
                </Stack>
            </Fieldset.Root>
        </Stack>
    )
}