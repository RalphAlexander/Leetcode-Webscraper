const puppeteer = require("puppeteer")

url = "https://leetcode.com/studyplan/leetcode-75/"
const webScrapper = async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(url)

        // waits for the list of problems to load
        await page.waitForSelector('.css-72ev5s')

        // css-yw0m6t - Table with the header of the topic
        // css-72ev5s - Row in the table 

        // returns the list of questions 
        const getProblemsArray = await page.evaluate(() => {
            const elements = document.querySelectorAll('.css-72ev5s .truncate')
            return Array.from(elements).map(element => element.textContent);
        })

        const arr = []
        getProblemsArray.forEach(element => {
            // construct URL from the question name
            element = element.replace(/[\s()]+/g, '-')
            element = element.replace(/-$|'/g, '')
            arr.push('https://leetcode.com/problems/' + element)

        });

        console.log('extracting data...')

        const problemsArray = []
        for (const problemUrl of arr) {

        const newPage = await browser.newPage()    
        await newPage.goto(problemUrl)
        console.log(problemUrl)

        // wait for the clickable dropdown to load
        await newPage.waitForSelector('.cursor-pointer .text-sm')
        await newPage.click('.cursor-pointer .text-sm')

        // wait for the dropdown elements to load
        await newPage.waitForSelector('.overflow-hidden .mt-2 .mr-4')

        // wait for the title element to load
        await newPage.waitForSelector('.items-center .text-lg')

        // wait for the difficulty element to load
        await newPage.waitForSelector('.space-x-4 .text-xs')

        // Returns an object with the details of the question
        const getProblemDetail = await newPage.evaluate(() => {
            const question = document.querySelector('.items-center .text-lg')

            // text returns a string in the form  123. Title
            const text = question.textContent.trim()
            const parts = text.split(".")
            const number = parts[0]
            const title = parts[1]
            
            const arr = document.querySelectorAll('.overflow-hidden .mt-2 .mr-4')
            const tags = Array.from(arr).map(element => element.textContent);

            const url = document.URL

            const difficulty = document.querySelector('.space-x-4 .text-xs').textContent.trim()
            return {number, title, tags, url, difficulty}
        })

        problemsArray.push(getProblemDetail)
        await newPage.close()
        }
        
    } catch (error) {
        console.log("An error occurred", error)
    }
}
module.exports = webScrapper