# To use this scraper, you need to be authenticated with Glassdoor

import gd_jobs
import scraper

job_type = int(input('''What kind of a job are you looking for? Enter a corresponding number: 
                 1 - frontend developer
                 2 - python developer
                 3 - instructional designer
                 4 - learning developer
                 5 - product education specialist
                 6 - all of the above
                 \n
                 '''))

if job_type == 6 :
    search_depth = 1
else :
    search_depth = int(input('''Select a time frame (enter a corresponding number): 
                 1 - last day
                 2 - last 3 days
                 3 - last 2 weeks
                 \n
                 '''))
    
print("Working... \n")
    
scraping_url = str()
filename = str()

for element in gd_jobs.gd_jobs :
    if element["id"] == job_type :
        filename = element["filename"]
        if search_depth == 1 :
            scraping_url = element["day_01_url"]
        elif search_depth == 2 :
            scraping_url = element["day_03_url"]
        elif search_depth == 3 :
            scraping_url = element["day_14_url"]

scraper.gd_scraper(scraping_url, filename)