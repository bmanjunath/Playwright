import { Page, } from 'playwright';
import { expect } from '@playwright/test';
import { Utility } from '../Utilities/Utility';

export class BasePage {
    protected page: Page;
    readonly baseUrl: string = 'https://www.flipkart.com';

    private  _flipkartLogo = "//a[@class='YLCOuy']";

    constructor(page: Page) {
        this.page = page;
    }

  public get flipkartLogo(): string {
    return this._flipkartLogo;
  }

  public set flipkartLogo(selector: string) {
    this._flipkartLogo = selector;
  }

    async navigateToHomePage() {
        console.log('Navigating to Flipkart home page...');
        await this.page.goto(this.baseUrl);
        const altText = await this.page.locator(this.flipkartLogo).getAttribute("title");
        console.log('Website is :', altText);
        expect(altText).toBe("Flipkart");
        console.log('Flipkart home page loaded successfully.');
    }

    async closeBrowser() {
        console.log("Closing browser...\n");
        await this.page.close();
    }

}