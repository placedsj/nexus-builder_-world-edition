
/**
 * Mock Insurance Service for PLACED LUNAI
 * Simulates real-time interactions with top Canadian insurance providers.
 */

export interface InsuranceApplicationRequest {
    partnerId: string;
    shedSpec: any;
    estimatedCost: number;
    riskScore: number;
}

export interface InsuranceQuote {
    quoteId: string;
    partner: string;
    monthlyPremium: number;
    annualSavings: number;
    status: 'approved' | 'pending' | 'referred';
    timestamp: string;
}

export const insuranceService = {
    /**
     * Simulates sending data to an insurance partner
     */
    applyForQuote: async (request: InsuranceApplicationRequest): Promise<InsuranceQuote> => {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 2500));

        const quoteId = `QT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Logical simulation based on risk score
        let status: 'approved' | 'pending' | 'referred' = 'approved';
        if (request.riskScore > 80) status = 'referred'; // High risk needs manual review
        else if (request.riskScore > 60) status = 'pending';

        const annualSavings = Math.round(request.estimatedCost * 0.05 + (100 - request.riskScore) * 2);
        const monthlyPremium = Math.round((1200 - annualSavings) / 12);

        return {
            quoteId,
            partner: request.partnerId.toUpperCase(),
            monthlyPremium,
            annualSavings,
            status,
            timestamp: new Date().toISOString()
        };
    },

    /**
     * Simulates document verification via LUNAI
     */
    verifyLUNAIBuild: async (shedId: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return true;
    }
};
