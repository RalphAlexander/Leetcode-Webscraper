# Leetcode Webscraper
A LeetCode webscraper to automate uploading questions into a Notion database for one's personal use, a finished template can be downloaded which feature questions from the [LeetCode 75 list](https://leetcode.com/studyplan/leetcode-75/).

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview
Extracts data from the [LeetCode 75 list](https://leetcode.com/studyplan/leetcode-75/) and posts it in a Notion database.
<br>

![Leetcode-List_Preview](https://github.com/FishTomato/Leetcode-Webscraper/assets/39258489/c294de36-9202-4c64-83da-43f76764ccb7)

Here is a preview of the resulting database:
<br>
<br>
![Notion-Database_Preview](https://github.com/FishTomato/Leetcode-Webscraper/assets/39258489/97ba1033-e37b-4388-aae7-011e7e1cd53c)

~Click here for the Notion Database Template.~ 
<br>
Site is currently in work in progress

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/FishTomato/Leetcode-Webscraper
	 ```
	 
2. Install the required dependencies
	```
	npm install
	```
	
3. Set up environment variables:
	- Create a .env file in the root directory of the project.
	- Add the following environment variables to the .env file:
		<br>
		```
		PORT=3000
		NOTION_KEY=<your_notion_api_key>
		NOTION_DATABASE_ID=<your_notion_database_id>
		NOTION_DIFFICULTY_ID=<your_notion_difficulty_column_id>
		NOTION_TOPICS_ID=<your_notion_topics_column_id>
		NOTION_NUMBER_ID=<your_notion_number_column_id>
		NOTION_URL_ID=<your_notion_url_column_id>
		NOTION_TITLE_ID=<your_notion_title_column_id> 
		```
4. Configure the project:

	Review the scraper.js file and ensure the URL variable is set correctly. Customize the scraping logic in scraper.js as per your requirements. Some functions are properly tuned to scrape leetcode question data given the URL.
## Usage
To run the program, use the following command:

```
node index.js
```
