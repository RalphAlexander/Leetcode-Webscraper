const puppeteer = require("puppeteer");

const URL = "https://leetcode.com/studyplan/top-interview-150/";

const webScraper = async () => {
    let problemsArray = [];

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);
        await page.waitForSelector(".css-72ev5s");

        const getProblemsArray = await page.evaluate(() => {
            const elements = document.querySelectorAll(".css-72ev5s .truncate");
            return Array.from(elements).map((element) => element.textContent);
        });

        const arr = [];
        getProblemsArray.forEach((element) => {
            // constructs the link from the title by removing characters specified in the regex
            element = element.replace(/[(),'"]/g, "");
            element = element.replace(/[\s]+/g, "-");
            element = element.replace(/-+/g, "-");
            arr.push("https://leetcode.com/problems/" + element);
        });

        console.log("Extracting data...");

        for (const problemUrl of arr) {

                try {
                    const newPage = await browser.newPage();
                    await newPage.goto(problemUrl);
                    console.log(problemUrl);

                    await newPage.waitForSelector(".cursor-pointer .text-sm");
                    await newPage.click(".cursor-pointer .text-sm");
                    await newPage.waitForSelector(".overflow-hidden .mt-2 .mr-4");
                    await newPage.waitForSelector(".items-center .text-lg");
                    await newPage.waitForSelector(".space-x-4 .text-xs");

                    const getProblemDetail = await newPage.evaluate(() => {
                        const question = document.querySelector(".items-center .text-lg");
                        const text = question.textContent.trim();
                        const parts = text.split(".");
                        const number = parts[0];
                        const title = parts.slice(1).join(".").trim();
                        const arr = document.querySelectorAll(
                            ".overflow-hidden .mt-2 .mr-4"
                        );
                        const tags = Array.from(arr).map((element) =>
                            element.textContent.trim()
                        );
                        const url = document.URL;
                        const difficulty = document.querySelector(".space-x-4 .text-xs")
                            .textContent.trim();
                        return { number, title, tags, url, difficulty };
                    });

                    problemsArray.push(getProblemDetail);
                    await newPage.close();
                } catch (error) {
                    console.error(`An error occurred for ${problemUrl}:`, error);
                }
            }

            
    } catch (error) {
        console.log("An error occurred", error);
    }

    return problemsArray;
};

module.exports = webScraper;