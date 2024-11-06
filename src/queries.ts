import { gql } from "graphql-request";

export const GetDailyInstanceMetricsQuery = gql`
  query GetDailyInstanceMetrics($date: Date!, $cursor: String!) {
    instanceDailyUsageMetrics(snapshotDate: $date, after: $cursor) {
      nodes {
        snapshotDate
        instance {
          id
          name
          integration {
            name
          }
          enabled
          customer {
            id
            externalId
            name
          }
        }
        successfulExecutionCount
        failedExecutionCount
        spendMbSecs
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
