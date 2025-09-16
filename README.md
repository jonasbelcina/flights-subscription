## Cheap Flights Winnipeg

Stack: Next.js 14 (App Router) + TypeScript + TailwindCSS + shadcn-style UI + Supabase.

### Getting Started
1. Install dependencies:
```bash
npm install
```
2. Copy env and fill values:
```bash
cp .env.example .env.local
```
3. Run dev server:
```bash
npm run dev
```

### Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
N8N_API_SECRET=your-strong-shared-secret
```

### Deploy on Vercel
- Add the two env vars in your Vercel project settings.
- Push to Git, import on Vercel, and deploy.

### API: POST /api/deals
Secure endpoint for N8N to insert a new deal.

Auth: Bearer token via `N8N_API_SECRET`.

Request body (JSON):
```
{
  "destination": "Tokyo, Japan",
  "price": 650,
  "departure_date": "2025-10-12",
  "return_date": "2025-10-25",
  "airline": "Air Canada",
  "link": "https://www.google.com/travel/flights..."
}
```

Example cURL:
```bash
curl -X POST "$BASE_URL/api/deals" \
  -H "Authorization: Bearer $N8N_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Tokyo, Japan",
    "price": 650,
    "departure_date": "2025-10-12",
    "return_date": "2025-10-25",
    "airline": "Air Canada",
    "link": "https://www.google.com/travel/flights?..."
  }'
```


