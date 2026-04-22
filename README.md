# BigQuery Backend API

Simple Express API to run BigQuery sample queries, with optional dry-run mode for cost estimation.

## Features

- Query endpoints for:
  - Run sample dataset query
  - Top complaints
  - Complaints by status
  - Complaint search by status
- Global dry-run mode using environment variable (`DRY_RUN`)
- Estimated query cost in USD during dry run

## Prerequisites

- Node.js (recommended v18+)
- npm
- Google Cloud BigQuery access and credentials

## Installation

```bash
npm install
```

## Run the API

- Development mode (real query execution):

```bash
npm run dev
```

- Development dry-run mode (cost estimate only):

```bash
npm run dev:dryrun
```

- Start mode (real query execution):

```bash
npm start
```

- Start dry-run mode (cost estimate only):

```bash
npm run start:dryrun
```

Server runs on:

- `http://localhost:3000` (or `PORT` from environment)

## API Endpoints

Base route: `/api/v1/query`

- `GET /template` - Returns sample query template details
- `GET /run` - Runs sample query (or dry-run cost estimate)
- `GET /top-complaints?limit=10` - Top complaint types
- `GET /by-status?limit=25` - Complaint counts by status
- `GET /search?status=Closed&limit=50` - Search complaints by status

Other routes:

- `GET /health` - Health check
- `GET /api/v1` - API root info

## Dry-Run Behavior

Dry run is controlled by `DRY_RUN` environment variable.

- If `DRY_RUN=true` (or `1`):
  - Queries are validated and estimated only
  - No real query data is fetched
  - Response includes:
    - `dryRun: true`
    - `totalBytesProcessed`
    - `estimatedCostUsd`
- If `DRY_RUN` is not enabled:
  - Real BigQuery query executes
  - Response includes rows and row count

## Example Response (Dry Run)

```json
{
  "success": true,
  "data": {
    "dryRun": true,
    "totalBytesProcessed": "123456789",
    "estimatedCostUsd": 0.000561,
    "message": "Dry run completed. Query was validated but not executed."
  }
}
```

## Project Structure

```text
backend/
  server.js
  package.json
  bigquery/
    bigquery.js
  src/
    app.js
    controllers/
    middlewares/
    routes/
    services/
    utils/
```
