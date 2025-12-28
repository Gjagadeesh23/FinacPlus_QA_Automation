/*
===================================================================================
DemoQA Full UI + API Automation Flow

This test automates the complete DemoQA BookStore workflow.
It validates:
- UI login
- Book search
- Backend API data fetching
- Writing backend data into a file
- Proper logout

This ensures both frontend and backend systems are working correctly.
===================================================================================
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';

test('DemoQA Full UI Flow', async ({ page, request }) => {

  /*
  Open DemoQA Login Page
  */
  await page.goto('https://demoqa.com/login');

  /*
  Login to application
  */
  await page.fill('#userName', 'GANGAJAGADEESH');
  await page.fill('#password', 'Dhiya@28');
  await page.click('#login');

  /*
  Validate successful login
  */
  await page.waitForSelector('#userName-value');
  await expect(page.locator('#userName-value')).toHaveText('GANGAJAGADEESH');

  /*
  Navigate to Book Store
  */
  await page.click('#gotoStore');

  /*
  Search a specific book
  */
  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');
  await page.waitForSelector('.rt-tbody');
  await expect(page.locator('.rt-tbody')).toContainText('Learning JavaScript Design Patterns');

  /*
  Backend API Call to fetch book details using ISBN
  */
  const isbn = '9781449331818';
  const response = await request.get(`https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`);
  const data = await response.json();

  const title = data.title;
  const author = data.author;
  const publisher = data.publisher;

  /*
  Write backend book details into a text file
  */
  fs.writeFileSync('book_details.txt', `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}`);

  /*
  Logout from application
  */
  const logout = page.getByRole('button', { name: 'Log out' });
  await expect(logout).toBeVisible();
  await logout.click();
});
