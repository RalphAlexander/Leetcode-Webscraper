const { Client } = require("@notionhq/client")

require("dotenv").config()

const notion = new Client({ auth: process.env.NOTION_KEY })
const webScraper = require("./scraper")

// Function to get the id of columns
async function getDatabase() {
    const response = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID
    })
    console.log(response)
}

async function createPage(problems) {
    for (const problem of problems) {
        await notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_ID
            },
            properties: {
                [process.env.NOTION_TITLE_ID]: {
                    title: [{
                        type: "text",
                        text: {
                            content: problem.title

                        }
                    }]
                },
                [process.env.NOTION_TOPICS_ID]: {
                    multi_select:
                        problem.tags.map(tag => ({ name: tag }))
                },
                [process.env.NOTION_DIFFICULTY_ID]: {
                    select: {
                        name: problem.difficulty
                    }
                },
                [process.env.NOTION_NUMBER_ID]: {
                    number: parseInt(problem.number)
                },
                [process.env.NOTION_URL_ID]: {
                    url: problem.url
                },
            }
        })
        console.log(problem.title + " has been added")
    }
    console.log("Data has been imported")
}


webScraper().then((res) => {
    createPage(res)
}).catch((err) => {
    console.log(err)
})



