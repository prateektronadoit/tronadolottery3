// RPC Rate Limiting and Retry Utilities

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

export const defaultRetryOptions: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const exponentialBackoff = (attempt: number, options: RetryOptions = {}): number => {
  const { baseDelay, maxDelay, backoffMultiplier } = { ...defaultRetryOptions, ...options };
  const delay = baseDelay * Math.pow(backoffMultiplier, attempt);
  return Math.min(delay, maxDelay);
};

export const isRateLimitError = (error: any): boolean => {
  if (!error) return false;
  
  const errorMessage = typeof error === 'string' ? error : 
    (error.message || error.toString() || '');
  
  return errorMessage.includes('429') || 
         errorMessage.includes('Too Many Requests') ||
         errorMessage.includes('rate limit') ||
         errorMessage.includes('Rate limit');
};

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const { maxRetries } = { ...defaultRetryOptions, ...options };
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      if (isRateLimitError(error)) {
        const backoffDelay = exponentialBackoff(attempt, options);
        console.warn(`Rate limit hit, retrying in ${backoffDelay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
        await delay(backoffDelay);
      } else {
        // For non-rate-limit errors, use shorter delay
        await delay(500);
      }
    }
  }
  
  throw new Error('Max retries exceeded');
};

export const batchWithRateLimit = async <T, R>(
  items: T[],
  batchSize: number,
  processor: (item: T) => Promise<R>,
  delayBetweenBatches: number = 500
): Promise<R[]> => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    try {
      const batchResults = await Promise.all(
        batch.map(item => retryWithBackoff(() => processor(item)))
      );
      results.push(...batchResults);
    } catch (error) {
      console.warn(`Batch failed, continuing with next batch:`, error);
      // Continue with next batch instead of failing completely
    }
    
    // Add delay between batches (except for the last batch)
    if (i + batchSize < items.length) {
      await delay(delayBetweenBatches);
    }
  }
  
  return results;
};

// RPC endpoint configuration
export const POLYGON_RPC_ENDPOINTS = [
  'https://polygon-rpc.com',
  'https://rpc-mainnet.maticvigil.com',
  'https://rpc-mainnet.matic.network',
  'https://polygon.llamarpc.com',
  'https://polygon.rpc.blxrbdn.com'
];

export const getRandomRpcEndpoint = (): string => {
  const randomIndex = Math.floor(Math.random() * POLYGON_RPC_ENDPOINTS.length);
  return POLYGON_RPC_ENDPOINTS[randomIndex];
}; 