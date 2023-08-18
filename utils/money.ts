
export function makeReadable(amount: number): string {
    const amountText = String(amount)
    let digits: string[] = []

    let counter = 1
    for (let i=amountText.length - 1; i >= 0; i--) {
        digits.push(amountText[i])

        if (counter % 3 == 0 && counter != amountText.length)
            digits.push(".")

        counter++
    }
    digits = digits.reverse()

    return digits.join("")
}