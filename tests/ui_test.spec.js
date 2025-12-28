import { test, expect } from '@playwright/test';
import fs from 'fs';

test('DemoQA Full UI Flow', async ({ page, request }) => {

  // Open DemoQA login page
  await page.goto('https://demoqa.com/login');

  // Login
  await page.fill('#userName', 'GANGAJAGADEESH');
  await page.fill('#password', 'Dhiya@28');
  await page.click('#login');

  // Validate login
  await page.waitForSelector('#userName-value');
  await expect(page.locator('#userName-value')).toHaveText('GANGAJAGADEESH');

  // Go to Book Store
  await page.click('#gotoStore');

  // Search book
  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');
  await page.waitForSelector('.rt-tbody');
  await expect(page.locator('.rt-tbody')).toContainText('Learning JavaScript Design Patterns');

  // Backend API call
  const isbn = '9781449331818';
  const response = await request.get(`https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`);
  const data = await response.json();

  const title = data.title;
  const author = data.author;
  const publisher = data.publisher;

  // Write into file
  fs.writeFileSync('book_details.txt', `Title: ${title}\nAuthor: ${author}\nPublisher: ${publisher}`);

  // Logout
  const logout = page.getByRole('button', { name: 'Log out' });
  await expect(logout).toBeVisible();
  await logout.click();
});
