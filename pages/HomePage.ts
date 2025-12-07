import { BasePage } from './BasePage';
import { Page, } from 'playwright';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  private get searchInput() {
    return this.page.locator("//input[@class='Pke_EE' and @title='Search for Products, Brands and More' and @name='q']");
  }

  private get shakespeareBookLink() {
    return this.page.locator("//a[@class='wjcEIp' and contains(text(),'Shakespeare Ki Lokpriya Kahaniyan')]");
  }
   //Enter the book name and search the book
  async searchFor(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.shakespeareBookLink.waitFor({ timeout: 5000 });
    console.log('Found the books based on the search keyword');
  }
}