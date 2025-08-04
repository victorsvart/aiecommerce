# AI Search Test Cases

## Test Inputs and Expected Outputs

### Simple Category Searches
- Input: "accessories" → Expected: `/products?categories=1&page=1&view=grid`
- Input: "wearables" → Expected: `/products?categories=6&page=1&view=grid`
- Input: "smart home" → Expected: `/products?categories=8&page=1&view=grid`

### Price Range Searches
- Input: "accessories under 100" → Expected: `/products?categories=1&max=100&page=1&view=grid`
- Input: "products above 200" → Expected: `/products?min=200&page=1&view=grid`
- Input: "furniture below 500" → Expected: `/products?categories=7&max=500&page=1&view=grid`

### Sorting Searches
- Input: "accessories sorted by price" → Expected: `/products?categories=1&sortBy=priceAsc&page=1&view=grid`
- Input: "wearables cheapest first" → Expected: `/products?categories=6&sortBy=priceAsc&page=1&view=grid`
- Input: "audio devices A-Z" → Expected: `/products?categories=3&sortBy=nameAsc&page=1&view=grid`

### Combined Searches
- Input: "smart home and networking under 300" → Expected: `/products?categories=8,13&max=300&page=1&view=grid`
- Input: "accessories and peripherals above 50 sorted by price" → Expected: `/products?categories=1,2&min=50&sortBy=priceAsc&page=1&view=grid`

### Brand Searches
- Input: "logitech products" → Expected: `/products?brands=Logitech&page=1&view=grid`
- Input: "sony audio devices" → Expected: `/products?categories=3&brands=Sony&page=1&view=grid`

## Common Issues Fixed
1. **Backticks**: AI was returning responses wrapped in backticks like `` `/products?categories=1` ``
2. **Quotes**: AI was returning responses wrapped in quotes like `"/products?categories=1"`
3. **Encoding**: URLs were getting double-encoded
4. **Invalid URLs**: Malformed URLs causing navigation errors

## Validation
- All responses should start with `/products?`
- All responses should include `page=1` and `view=grid`
- Category IDs should be valid (1-13)
- Price ranges should be numeric
- Sort options should be valid (`featured`, `priceAsc`, `priceDesc`, `nameAsc`, `nameDesc`) 