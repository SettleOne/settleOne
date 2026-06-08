export async function uploadToIPFS(file: File): Promise<string> {
  // In a real implementation, this would use Pinata or NFT.storage SDKs
  console.log(`Uploading ${file.name} to IPFS...`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock CID
  return `QmMockCidFor${file.name.replace(/[^a-zA-Z0-9]/g, '')}${Date.now()}`;
}

export function extractCIDFromURL(url: string): string | null {
  const match = url.match(/ipfs:\/\/(.+)/) || url.match(/\/ipfs\/(.+)/);
  return match ? match[1] : null;
}
