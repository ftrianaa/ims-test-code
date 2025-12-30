"use client";

import api from "@/lib/api";
import { toaster } from "@/components/ui/toaster";
import { Button, Card, Field, FieldLabel, Fieldset, Input, Stack, Text } from "@chakra-ui/react"
import { useState } from "react";
import { calculateInstallment } from "@/services/contract.service";
import { formatPrice } from "@/utils/format";

export default function InputInstallment() {
    const [data, setData] = useState({
        client_name: "",
        tenor: "",
        otr: "",
        dp: ''
    })

    const handleClose = () => {
        setData({
            client_name: "",
            tenor: "",
            otr: "",
            dp: ''
        })
    }

    const handleSubmit = async () => {
        try {
            const dpAmount =  (data.dp / 100) * data.otr
            const payload = {
                client_name: data.client_name,
                otr: parseFloat(data.otr),
                tenor: parseInt(data.tenor),
                dp: parseFloat(dpAmount)
            }

            const installment_amount = calculateInstallment(payload)

            setData({
                ...data,
                installment_amount
            })

            console.log({...payload, installment_amount}, 'ini payloas')
            const result = await api.post("/api/contract", payload)

            console.log("data has been saved with result: ", result.data)
        } catch (error) {
            console.log("error handling submit for contract: ", error);
        } finally {
            toaster.success({
                title: "Success",
                description: "Contract has been created",
            });
        }
    }

    return (
        <Stack w={'100vw'} align={'center'} justify={'center'} gap={5}>
            {data && data?.installment_amount &&
                <Card.Root p={5}>
                    <Button
                        size="sm"
                        position="absolute"
                        top={2}
                        right={2}
                        variant="ghost"
                        onClick={handleClose}
                    >
                        ✕
                    </Button>
                    <Card.Header>
                        <Card.Description>
                            Hasil perhitungan angsuran bulanan selama {data.tenor} bulan
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Text>Yang harus dibayarkan {data.client_name} perbulannya adalah {formatPrice(data.installment_amount)}</Text>
                    </Card.Body>
                </Card.Root>
            }
            <Fieldset.Root size="lg" maxW="md">
                <Stack gap={4}>
                    <Field.Root>
                        <FieldLabel>Client Name</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, client_name: e.target.value })} value={data.client_name} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>OTR</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, otr: e.target.value })} value={data.otr} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>DP (% OTR)</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, dp: e.target.value })} value={data.dp} />
                    </Field.Root>
                    <Field.Root>
                        <FieldLabel>Tenor (month)</FieldLabel>
                        <Input onChange={(e) => setData({ ...data, tenor: e.target.value })} value={data.tenor} />
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