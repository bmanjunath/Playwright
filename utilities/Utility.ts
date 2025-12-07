import { BrowserContext, Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { ProductDetails } from '../pages/ProductDetails';
import { CartPage } from '../pages/CartPage';


export class Utility {

    // Script to handle child window, after clicking on searched book
    async openNewTabAfterClick(
        context: BrowserContext,
        page: Page,
        locator: string
    ): Promise<Page> {
        const pagePromise = context.waitForEvent('page');
        await page.click(locator);
        const newPage = await pagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    //Read Testdata from testdata.json file
    static readSearchKeyword(): string {
        const filePath = path.join(__dirname, '../testdata/testdata.json'); // Adjust path as needed
        console.log("Test data filePath:", filePath);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        console.log("Search keyword found in test data file")
        return jsonData.searchKeyword;
        
    }
    //Add Books To the Cart
    static async addBookToCartAndGetClass(page: Page, itemCount: number, quantity: number): Promise<string | null> {
        const productDetails = new ProductDetails(page);
        await productDetails.clickAddToCart();
        const cartPage = new CartPage(page);
        await page.waitForLoadState();
        if (quantity === 3) {
            await cartPage.clickPriceItemThird();
            await page.waitForTimeout(1000); // optional small delay for UI update
        }
        const priceItem = cartPage.getPriceItemByItemCount(itemCount);
        console.log(`Waiting for Item (${itemCount} ${itemCount === 1 ? 'item' : 'items'}) element...`);
        await priceItem.waitFor({ state: 'visible', timeout: 5000 });
        const classAttr = await priceItem.getAttribute('class');
        console.log(`Number of items added to the cart (${itemCount} items):`, classAttr);
        await page.waitForLoadState();
        await page.waitForLoadState('networkidle');
        await page.screenshot({
        path: path.join(__dirname, '../test/playwright-report', `book-${itemCount}-cart.png`),
        fullPage: true,
         });

        console.log("Books are successfully added to Cart");
        return classAttr;
    }

    //Read the Locator from xpath.json
    static readLocator(key: string): string {
        const filePath = path.resolve(__dirname, '../testdata/xpath.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        return jsonData.bookSelectors[key];
    }

    //To Verify Books Added to Cart
    static async verifyBooksInCart(page: Page, locators: string[]) {
        for (const xpath of locators) {
            const locator = page.locator(xpath);
            const count = await locator.count();
            if (count === 0) {
                throw new Error(`Book not found in cart for XPath: ${xpath}`);
            }
            await expect(locator).toBeVisible({ timeout: 5000 });
            console.log(`Verified that added books are present in cart oage: ${xpath}`);
        }
    }

}
    