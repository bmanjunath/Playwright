import { BasePage } from './BasePage';
import { expect, Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get priceItemThird() {
    return this.page.locator("//button[@class='LcLcvv']").nth(1);
  }

  //For increasing the book quentity by two
  async clickPriceItemThird(): Promise<void> {
    await expect(this.priceItemThird).toBeVisible({ timeout: 5000 });
    await this.priceItemThird.click();
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const quantityInput = this.page.locator('input.p6sArZ');
    await expect(quantityInput).toHaveValue('2', { timeout: 5000 });
    await this.priceItemThird.waitFor({ state: 'visible', timeout: 5000 });
    console.log("Clicked and quantity is increased to 2");
  }

  //Helps in validating the quantity of books added
  public getPriceItemByItemCount(count: number) {
    const label = count === 1 ? 'item' : 'items';
    return this.page.locator(`//div[contains(text(), 'Price (${count} ${label})')]`);
  }

}