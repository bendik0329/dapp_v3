/* eslint-disable prettier/prettier */
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_pYsMRwum2',
  ClientId: '5s8jqussath0biforh3qc3j7pa',
};
export default new CognitoUserPool(poolData);
