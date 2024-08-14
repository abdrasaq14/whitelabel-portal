
export const decodeHtml = (html: any) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }


export function formatAmount(amount: number): string {
  // Check if the amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return 'Invalid amount';
  }

  // Format the amount as NGN with two decimal places
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
}
