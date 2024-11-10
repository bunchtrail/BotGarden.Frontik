// src/utils/errors.ts
export class AuthenticationError extends Error {
    type: 'unauthorized' | 'general';
    
    constructor(message: string, type: 'unauthorized' | 'general' = 'general') {
      super(message);
      this.type = type;
      this.name = 'AuthenticationError';
    }
  }