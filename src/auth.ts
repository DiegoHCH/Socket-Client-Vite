

export async function authenticate(email: string): Promise<any> {
  const response = await fetch('https://api-heylinx-develop.mdcloudps.com/api/heylinx/auth/connect-heylinx', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  const data = await response.json();
  return data; 
}
