/*
===================================================================================
Public API Automation Flow

This test automates a complete backend API workflow.
It validates Create, Read, and Update operations of a public REST API.
This ensures that the backend services are working correctly.
===================================================================================
*/

import { test, expect } from '@playwright/test';

test('Public API Automation Flow', async ({ request }) => {

  /*
  CREATE USER
  This POST request creates a new user in the system.
  */
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

  /*
  GET USER
  This GET request fetches an existing user.
  */
  const getResponse = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  expect(getResponse.status()).toBe(200);
  const getData = await getResponse.json();
  console.log("Fetched User:", getData.name);

  /*
  UPDATE USER
  This PUT request updates an existing user's name.
  */
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

