import { getContract, postContract } from "@/models/contract.model";
import { calculateInstallment } from "@/services/contract.service";

export async function listContract() {
    const users = await getContract();
    return { success: true, data: users };
}

export async function addContract(body) {
    if (!body.client_name) {
        throw new Error("Client Name is required");
    }

    if (!body.otr) {
        throw new Error("OTR is required");
    }

    if (!body.tenor) {
        throw new Error("Tenor is required");
    }

    const result = calculateInstallment({
        otr: body.otr,
        tenor: body.tenor,
        dp: body.dp
    })

    const payload = {
        ...body,
        installment_amount: result
    }

    const id = await postContract(payload);
    return { success: true, id };
}
