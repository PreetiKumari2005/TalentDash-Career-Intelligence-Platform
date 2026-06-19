from scraper.base_scraper import BaseScraper
from bs4 import BeautifulSoup

class AmbitionBoxScraper(BaseScraper):
    def __init__(self):
        super().__init__("https://www.ambitionbox.com")

    def scrape_salaries(self, query_company: str) -> list:
        print(f"[Scraper]: Querying AmbitionBox corporate vectors for '{query_company}'...")
        html = self.fetch_html("/salaries", params={"company": query_company})
        if not html:
            return []
            
        soup = BeautifulSoup(html, "html.parser")
        mock_scraped_items = [
            f"AmbitionBox raw: {query_company} SDE-2 fixed 2400000 INR plus 300000 variable incentive at Bangalore",
            f"AmbitionBox raw: {query_company} Data Scientist base 18 LPA near Mumbai"
        ]
        return mock_scraped_items