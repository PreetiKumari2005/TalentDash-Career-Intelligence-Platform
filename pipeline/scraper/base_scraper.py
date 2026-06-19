import requests
from bs4 import BeautifulSoup
from scraper.user_agents import get_random_user_agent

class BaseScraper:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def fetch_html(self, endpoint: str, params: dict = None) -> str:
        url = f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
        headers = {
            "User-Agent": get_random_user_agent(),
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code == 200:
                return response.text
            print(f"[Scraper Warning]: Bad response status {response.status_code} for {url}")
        except requests.RequestException as e:
            print(f"[Scraper Error]: Network drop requesting {url}. Detail: {e}")
        return ""