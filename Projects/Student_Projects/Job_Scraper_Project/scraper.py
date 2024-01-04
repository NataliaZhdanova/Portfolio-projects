# To parse
from bs4 import BeautifulSoup
# To bypass the cloudflare antibot
import cloudscraper
# To export in csv format
import pandas

scraper = cloudscraper.create_scraper()

def gd_scraper(URL, filename):

    # Getting the webpage
    html = scraper.get(URL)

    # Parsing the webpage
    soup = BeautifulSoup(html.text, 'html.parser')

    # Finding elements containing the required data
    allJobs = soup.find_all("li", {"data-test":"jobListing"})

    new_list = list()
    new_dict = dict()

    for index in range(0, len(allJobs)):
        text = allJobs[index].find("div",{"class":"EmployerProfile_employerInfo__EehaI"}).text
    
    # Getting the clean company name
        try:
            tail = allJobs[index].find("span",{"class":"EmployerProfile_employerRating__lq_ZL"}).text
        except:
            tail = 0 
        try:
            clear_text = text[:-len(tail)]
        except:
            clear_text = text
    
    # Getting other position-related data    
        job = allJobs[index].find("a",{"class":"JobCard_seoLink__r4HUE"}).text
        location = allJobs[index].find("div",{"class":"JobCard_location__DX0MJ"}).text
        link =  allJobs[index].find("a",{"class":"JobCard_seoLink__r4HUE"}).get('href')

    # Creating a dictionary for a position
        new_dict["company_name"] = clear_text
        new_dict["job_name"] = job
        new_dict["location"] = location
        new_dict["URL"] = "https://www.glassdoor.com" + link

    # Populating a list with available positions
        new_list.append(new_dict)
        new_dict = dict()

    # Getting the job description

    for element in new_list :
        descr_html = scraper.get(element["URL"])
        descr_soup = BeautifulSoup(descr_html.text, 'html.parser')
        try:
            descr = descr_soup.find("div", {"class":"desc css-58vpdc ecgq1xb5"}).text
        except:
            descr = 0
        element["job_description"] = descr

    # Exporting to the csv file

    dataframe = pandas.DataFrame(new_list)
    dataframe.to_csv(filename, index = False, encoding = 'utf-8')
    print(f"Your data is saved to the {filename} file.")