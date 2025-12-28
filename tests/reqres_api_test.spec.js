import { test, expect } from '@playwright/test';

test('Public API Automation Flow', async ({ request }) => {

  // CREATE USER
  const createResponse = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Jaggu',
        username: 'jaggu123',
        email: 'jaggu@test.com'
      }
    }
  );

  expect(createResponse.status()).toBe(201);
  const createData = await createResponse.json();
  console.log("Created User ID:", createData.id);

  // GET USER (existing)
  const getResponse = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  expect(getResponse.status()).toBe(200);
  const getData = await getResponse.json();
  console.log("Fetched User:", getData.name);

  // UPDATE USER (existing)
  const updateResponse = await request.put(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        name: 'Jaggu Updated'
      }
    }
  );

  expect(updateResponse.status()).toBe(200);
  const updateData = await updateResponse.json();
  console.log("Updated Name:", updateData.name);
});
