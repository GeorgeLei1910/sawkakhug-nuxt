import { SquareClient, SquareEnvironment } from "square";

/**
 * Shared SquareClient singleton instance.
 * Automatically imported across all server/ routes and event handlers in Nuxt.
 */
const config = useRuntimeConfig();

export const squareLocationId: string =
  config.squareLocationId || process.env.SQUARE_LOCATION_ID || "L8JKG4FT7AG9V";

export const squareClient = new SquareClient({
  token: config.squareAccessToken || process.env.SQUARE_ACCESS_TOKEN,
  environment:
    (config.squareEnvironment || process.env.SQUARE_ENVIRONMENT)?.toLowerCase() === "sandbox"
      ? SquareEnvironment.Sandbox
      : SquareEnvironment.Production,
});

