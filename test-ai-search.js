// Simple test script for AI search functionality
const { OpenAiClient } = require('./lib/openapi-client.ts');

async function testAISearch() {
  console.log('Testing AI search functionality...');
  
  const client = new OpenAiClient();
  
  try {
    const testQueries = [
      "i need stuff for my smart home",
      "accessories under 100",
      "wearables",
      "audio devices"
    ];
    
    for (const query of testQueries) {
      console.log(`\nTesting query: "${query}"`);
      const response = await client.createChatCompletion(query);
      console.log(`Response: ${response}`);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAISearch(); 