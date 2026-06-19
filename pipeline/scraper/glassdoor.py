from scraper.base_scraper import BaseScraper
from bs4 import BeautifulSoup

class GlassdoorScraper(BaseScraper):
    def __init__(self):
        super().__init__("https://www.glassdoor.com")

    def scrape_salaries(self, query_company: str) -> list:
        print(f"[Scraper]: Extracting Glassdoor listings for '{query_company}'...")
        html = self.fetch_html("/Salary/index.htm", params={"query": query_company})
        if not html:
            return []
            
        soup = BeautifulSoup(html, "html.parser")
        mock_scraped_items = [
            f"Glassdoor item: {query_company} Senior Dev made $160,000 base pay with 15k bonus in New York",
            f"Glassdoor item: {query_company} PM made $130,000 base with 20000 equity in San Francisco"
        ]
        return mock_scraped_items