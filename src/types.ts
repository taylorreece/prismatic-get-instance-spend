interface DailyInstanceMetric {
  instance_id: string;
  instance_name: string;
  integration_name: string;
  customer_id: string;
  customer_name: string;
  customer_external_id: string;
  successful_execution_count: number;
  failed_execution_count: number;
  spend_mb_secs: number;
}

interface DailyInstanceMetricsResponse {
  instanceDailyUsageMetrics: {
    nodes: Array<{
      snapshotDate: string;
      instance: {
        id: string;
        enabled: boolean;
        name: string;
        integration: { name: string };
        customer: {
          id: string;
          externalId: string;
          name: string;
        };
      };
      successfulExecutionCount: number;
      failedExecutionCount: number;
      spendMbSecs: number;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}
