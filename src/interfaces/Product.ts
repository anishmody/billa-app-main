export interface Product {
    id: number;
    provider_image: string;
    provider_name: string;
    plan_name: string;
    contract_length: string;
    expected_annually_bill_amount:number
    expected_monthly_bill_amount:number
    energy_type: string;
    exit_fee: string;
    cooling_off_period: string; 
    benefit_term: string;
    
}