import { BasePage } from './BasePage';

import { expect, Locator, Page } from '@playwright/test';

export class ProductDetails extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  
  get addToCartButton() {
    return this.page.locator("//button[contains(text(), 'Add to cart')]");
  }

  // Book 1
   get book1(): string {
    return "//a[@class='wjcEIp' and contains(text(),'Shakespeare Ki Lokpriya Kahaniyan')]";
  }

  // Book 2
  get book2(): string {
    return "//a[contains(text(),'Web Automation Testing Using Playwright')]";
  }

  // First book in cart
  get firstBookAdded(): string {
    return "//a[contains(text(), 'Shakespeare Ki Lokpriya Kahaniyan')]";
  }

  // Second book in cart
  get secondBookAdded(): string {
    return "//a[contains(text(), 'Web Automation Testing Using Playwright')]";
  }

  // Flipkart logo
  get flipkartLogoxpath(): string {
    return "//a[@class='YLCOuy']";
  }

  // Flipkart Cart URL 
  get flipkartCartUrl(): string {
    return "https://www.flipkart.com/viewcart?exploreMode=true&preference=FLIPKART";
  }

   //Click on add to cart 
  async clickAddToCart() {
    try {
      await this.page.waitForLoadState('networkidle');
      await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.addToCartButton).toBeEnabled();
      await this.addToCartButton.click({ timeout: 5000 });
      console.log('Clicked Add to cart button successfully');
    } catch (error) {
      await this.page.screenshot({ path: 'error-add-to-cart.png', fullPage: true });
      console.error('Add to cart click failed:', error);
      throw error;
    }
  }
}