export interface InvestorResponse {
    meta: Meta
    data: Daum[]
  }
  
  export interface Meta {
    total: number
    returned: number
    page: number
  }
  
  export interface Daum {
    investorId: string
    investorName: string
    fundId: string
    fundName: string
    fundManagerId: string
    fundManagerName: string
    currentRedeemed: string
    reportedFundSizeCurrency: string
    initialInvestmentSize: string
    initialInvestmentDate: string
    mostRecentValuation: string
    mostRecentValuationDate: string
    fundType: string
    fundStructure: string
    coreStrategy: string
    inceptionDate: string
    fundAumMn: string
    fundAumDate: string
    twelveMonthsReturn: string
    asAtDate: string
  }