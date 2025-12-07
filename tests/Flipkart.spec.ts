import { test, expect, chromium, Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Utility } from '../Utilities/Utility';
import { ProductDetails } from '../pages/ProductDetails';


let context: BrowserContext;
let page: Page
let firstBook: string | null;
let secondBook: string | null;

test.describe.serial('Book Cart Flow', () => {
  test.beforeAll(async ({ browser }) => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

  });

  //Search for the keyword "Playwright" in the search bar
  test('Search Text Books', async () => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    const searchText = Utility.readSearchKeyword();
    console.log("Search keyword is : ", searchText);
    await homePage.searchFor(searchText);
    console.log("Playwright book is searched with keyword 'Playwright'");
  });



  test.afterAll(async () => {
    await context.close();
  });
});
