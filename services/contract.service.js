export function calculateInstallment({ otr, dp, tenor }) {
    let interest = 0

    if (tenor <= 12) {
        interest = 12
    } else if (tenor > 12 && tenor <= 24) {
        interest = 14
    } else {
        interest = 24
    }

    const percentage = interest / 100

    const principal = otr - dp;
    const totalInterest = principal * percentage;
    const total = principal + totalInterest;

    const installment_amount = Math.round(total / tenor);
    
    return installment_amount
}
