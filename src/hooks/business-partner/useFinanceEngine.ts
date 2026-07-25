export function useFinanceEngine() {
  const generateMocks = (budgetText: string | null) => {
    let budgetVal = 10;
    if (budgetText) {
      const match = budgetText.match(/(\d+[\d,]*)/);
      if (match) budgetVal = parseInt(match[1].replace(/,/g, ''), 10);
      if (budgetText.toLowerCase().includes('k') || budgetText.toLowerCase().includes('thousand')) {
        budgetVal /= 100;
      }
    }
    const total = budgetVal * 100000;
    return {
      total,
      rent: total * 0.15,
      equipment: total * 0.35,
      monthlyRev: total * 0.08,
      monthlyExp: total * 0.04,
      fmt: (val: number) => '₹' + (val / 100000).toFixed(1) + 'L'
    };
  };

  const buildFinanceIntelligenceCardProps = (budgetStr: string | null) => {
    const data = generateMocks(budgetStr);
    return {
      type: 'financeIntelligence',
      estimatedInvestment: data.fmt(data.total),
      monthlyRev: data.fmt(data.monthlyRev),
      monthlyExp: data.fmt(data.monthlyExp)
    };
  };

  return { buildFinanceIntelligenceCardProps };
}
