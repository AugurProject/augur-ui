import {promises} from "fs";

interface IntegrationHelpers {
  updateAccountAddress(address: string): void;
  findMarketId(marketDescription: string): void;
  hasDisclaimerModalBeenDismissed(): boolean;
}

declare namespace window {
  export const integrationHelpers:IntegrationHelpers;
}

