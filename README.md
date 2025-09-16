### API: POST /api/deals/bulk
Accepts an array of objects each with a `subject` and `deals[]` (from your flight alert emails). It derives the destination from the subject, creates a parent deal, and inserts all child flights into `deal_flights`.

Auth: Bearer `N8N_API_SECRET`

Payload example:
```json
[
  {
    "subject": "Your tracked route: Winnipeg to Toronto flights from CA$131",
    "deals": [
      {
        "dateRange": "Sat 1 Nov - Fri 7 Nov",
        "discount": 21,
        "price": 131,
        "airlines": ["Flair Airlines"],
        "stops": "Non-stop",
        "duration": "YWG–YYZ · 3 hrs",
        "link": "https://www.google.com/travel/flights?..."
      }
    ]
  }
]
```

Returns `{ ok, created: [{id, destination}], warnings }`.
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
Create a single deal with a subject and optional `flights` array.

Auth: Bearer token via `N8N_API_SECRET`.

Request body (JSON):
```
{
  "subject": "Your tracked route: Winnipeg to Toronto flights from CA$131",
  "flights": [
    {
      "dateRange": "Sat 1 Nov - Fri 7 Nov",
      "airlines": ["Flair Airlines"],
      "stops": "Non-stop",
      "duration": "YWG–YYZ · 3 hrs",
      "price": 131,
      "link": "https://..."
    }
  ]
}
```

Example cURL:
```bash
curl -X POST "$BASE_URL/api/deals" \
  -H "Authorization: Bearer $N8N_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Your tracked route: Winnipeg to Toronto flights from CA$131",
    "flights": [
      { "dateRange": "Sat 1 Nov - Fri 7 Nov", "airlines": ["Flair Airlines"], "stops": "Non-stop", "duration": "YWG–YYZ · 3 hrs", "price": 131, "link": "https://..." }
    ]
  }'

### Database columns (table `deals`)
- `id` uuid primary key (default uuid_generate_v4())
- `subject` text

### Database columns (table `deal_flights`)
- `id` uuid primary key
- `deal_id` uuid references deals(id) on delete cascade
- `dateRange` text
- `airline` text
- `stops` text
- `duration` text
- `price` numeric
- `link` text
```


