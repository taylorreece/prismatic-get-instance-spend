import { writeFileSync } from "fs";
import { GraphQLClient } from "graphql-request";
import Papa from "papaparse";
import { GetDailyInstanceMetricsQuery } from "./queries";

const { PRISMATIC_URL, PRISMATIC_API_KEY, DATE } = process.env;

const API_ENDPOINT = PRISMATIC_URL
  ? `${PRISMATIC_URL}/api`
  : "https://app.prismatic.io/api";

if (!PRISMATIC_API_KEY) {
  throw new Error("You must set a PRISMATIC_API_KEY environment variable.");
}

if (!DATE) {
  throw new Error("You must set a DATE environment variable.");
}

const client = new GraphQLClient(API_ENDPOINT, {
  headers: { Authorization: `Bearer ${PRISMATIC_API_KEY}` },
});

const run = async () => {
  const dailyInstanceMetrics: DailyInstanceMetric[] = [];
  let cursor = "";
  let hasNextPage = false;

  do {
    const result = await client.request<DailyInstanceMetricsResponse>(
      GetDailyInstanceMetricsQuery,
      { date: DATE, cursor }
    );
    for (const instanceMetric of result.instanceDailyUsageMetrics.nodes) {
      dailyInstanceMetrics.push({
        customer_id: instanceMetric.instance.customer.id,
        customer_name: instanceMetric.instance.customer.name,
        customer_external_id: instanceMetric.instance.customer.externalId,
        instance_id: instanceMetric.instance.id,
        instance_name: instanceMetric.instance.name,
        integration_name: instanceMetric.instance.integration.name,
        failed_execution_count: instanceMetric.failedExecutionCount,
        successful_execution_count: instanceMetric.successfulExecutionCount,
        spend_mb_secs: instanceMetric.spendMbSecs,
      });
    }
    cursor = result.instanceDailyUsageMetrics.pageInfo.endCursor;
    hasNextPage = result.instanceDailyUsageMetrics.pageInfo.hasNextPage;
  } while (hasNextPage);

  writeFileSync(
    "./result.csv",
    Papa.unparse(
      dailyInstanceMetrics.sort((a, b) =>
        a.spend_mb_secs > b.spend_mb_secs ? -1 : 1
      )
    )
  );
};

run();
