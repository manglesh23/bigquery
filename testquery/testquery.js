// queryBigQuery.js
import bigquery from '../bigquery/bigquery.js';

async function runQuery() {
  const query = `
    SELECT name, COUNT(*) as count
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
    WHERE state = 'TX'
    GROUP BY name
    ORDER BY count DESC
    LIMIT 10
  `;

const query1 = `
  SELECT unique_key, complaint_description, status
  FROM \`bigquery-public-data.austin_311.311_service_requests\`
  LIMIT 100
`;

  const options = {
    query: query1,
    location: 'US', // Dataset location
  };

  const [rows] = await bigquery.query(options);
  console.log('Results:');
  rows.forEach(row => console.log(row));
}

runQuery().catch(console.error);
export default runQuery;